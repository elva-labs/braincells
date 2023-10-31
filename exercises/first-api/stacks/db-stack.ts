import { StackContext, Api, Table } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export function DB({ stack }: StackContext) {
  const table = new Table(stack, 'rest-table', {
    fields: {
      pk: 'string',
      sk: 'number',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk',
    },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  stack.addOutputs({
    TableName: table.tableName,
  });

  return {
    table,
  };
}
