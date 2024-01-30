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

  const stateMachine = new sfn.StateMachine(stack, 'WeatherPollerMachine', {
    definitionBody: sfn.DefinitionBody.fromChainable(stepsDefinition),
  });

  new Config.Parameter(stack, 'STATE_MACHINE_ARN', {
    value: stateMachine.stateMachineArn,
  });
}
