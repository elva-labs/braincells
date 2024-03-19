import { StackContext, Bucket, Queue, EventBus } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export function ImageTransformationStack({ stack }: StackContext) {

  const bucket = new Bucket(stack, 'Bucket');

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

  return {bucket, table};
}
