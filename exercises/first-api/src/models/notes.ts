import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

export interface Note {
  id: number;
  text: string;
}

const TABLE = process.env.TABLE!;

const DbClient = DynamoDBDocumentClient.from(new DynamoDBClient(), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const getAll = async (user: string): Promise<Note[]> => {
  const res = await DbClient.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': user,
      },
    }),
  );
  const notes = res.Items?.map((item) => ({
    id: item.sk,
    text: item.text,
  }));

  return notes || [];
};
