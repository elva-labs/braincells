import { Function, StackContext, Cron, Config } from 'sst/constructs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export function weatherPollMachine({ stack }: StackContext) {
  const SLACK_WEBHOOK = new Config.Secret(stack, 'SLACK_WEBHOOK');
  const SMHI_ENDPOINT = new Config.Parameter(stack, 'SMHI_ENDPOINT', {
    value:
      'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point',
  });
  const YR_ENDPOINT = new Config.Parameter(stack, 'YR_ENDPOINT', {
    value: 'https://api.met.no/weatherapi/locationforecast/2.0/compact',
  });

  const pollYr = new tasks.LambdaInvoke(stack, 'PollYR', {
    lambdaFunction: new Function(stack, 'dataPollerYr', {
      bind: [YR_ENDPOINT],
      handler: 'src/functions/pollYR.main',
    }),
    outputPath: '$.Payload',
  });

  const pollSmhi = new tasks.LambdaInvoke(stack, 'PollSMHI', {
    lambdaFunction: new Function(stack, 'dataPollerSMHI', {
      bind: [SMHI_ENDPOINT],
      handler: 'src/functions/pollSMHI.main',
    }),
    outputPath: '$.Payload',
  });

  const aggregate = new tasks.LambdaInvoke(stack, 'Aggregator', {
    lambdaFunction: new Function(stack, 'dataAggregator', {
      handler: 'src/functions/aggregate.main',
    }),
    outputPath: '$.Payload',
  });

  const postToSlack = new tasks.LambdaInvoke(stack, 'PostToSlack', {
    lambdaFunction: new Function(stack, 'postToSlack', {
      handler: 'src/functions/postToSlack.main',
      bind: [SLACK_WEBHOOK],
    }),
  });

  const stepsDefinition = new sfn.Parallel(stack, 'WeatherPolls', {})
    .branch(pollYr)
    .branch(pollSmhi)
    .next(aggregate)
    .next(postToSlack);

  const stateMachine = new sfn.StateMachine(stack, 'WeatherPollerMachine', {
    definitionBody: sfn.DefinitionBody.fromChainable(stepsDefinition),
  });

  const bootloader = new Function(stack, 'stepFunctionStarter', {
    handler: 'src/functions/startStepFunction.main',
    environment: {
      STATE_MACHINE_ARN: stateMachine.stateMachineArn,
    },
  });
  stateMachine.grantStartExecution(bootloader);

  new Config.Parameter(stack, 'STATE_MACHINE_ARN', {
    value: stateMachine.stateMachineArn,
  });

  // Run @ 06.00 every day
  const cron = new Cron(stack, 'initializeStateMachine', {
    schedule: 'cron(00 05 * * ? *)',
    job: bootloader,
  });

  stack.addOutputs({
    StateMachineName: stateMachine.stateMachineName,
    StateMachineARN: stateMachine.stateMachineArn,
  });

  return {
    cron,
    stateMachine,
  };
}
