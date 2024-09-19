import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';

const SFN_CLIENT = new SFNClient({});

export const main = async () => {
  await SFN_CLIENT.send(
    new StartExecutionCommand({
      stateMachineArn: process.env.STATE_MACHINE_ARN,
    }),
  );
};
