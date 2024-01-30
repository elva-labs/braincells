// TODO: Move this to elva-labs tools
import {
  DescribeStateMachineCommand,
  SFNClient,
  TestStateCommand,
} from '@aws-sdk/client-sfn';

export interface testStateInput {
  stateMachineArn: string;
  taskName: string;
  input?: string;
}

const client = new SFNClient({});

export const getStateMachine = async (stateMachineArn: string) => {
  const stateMachine = await client.send(
    new DescribeStateMachineCommand({
      stateMachineArn: stateMachineArn,
    }),
  );

  return stateMachine;
};

const getTask = (taskName: string, definition: string) => {
  const obj = JSON.parse(definition);

  const task = findState(obj, taskName);

  return JSON.stringify(task);
};

export const findState = (obj: any, needle: string): any | null => {
  if (obj[needle]) return obj[needle];

  for (const prop of Object.keys(obj)) {
    const value = obj[prop];

    if (typeof value != 'object') {
      continue;
    }

    const res = findState(value, needle);

    if (res) {
      return res;
    }
  }

  return null;
};

export const testState = async ({
  stateMachineArn,
  taskName,
  input,
}: testStateInput) => {
  const stateMachine = await getStateMachine(stateMachineArn);

  if (!stateMachine.definition) {
    throw new Error('stateMachine.definition is undefined');
  }

  const task = getTask(taskName, stateMachine.definition);

  if (!task) {
    console.info(stateMachine.definition);
    throw new Error('task does not exist');
  }

  const work = client.send(
    new TestStateCommand({
      definition: task,
      roleArn: stateMachine.roleArn,
      input: input,
    }),
  );

  const res = await work;

  return JSON.parse(res.output ?? '{}');
};
