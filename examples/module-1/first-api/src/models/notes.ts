import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

export interface Note {
  id: number;
  text: string;
}

const TABLE = process.env.TABLE!;
const CLIENT = DynamoDBDocumentClient.from(new DynamoDBClient(), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const upsert = async (user: string, note: Note): Promise<Note> => {
  await CLIENT.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: user,
        sk: Math.round(Math.random() * 100_000_000),
        ...note,
      },
    }),
  );

  return note;
};

export const getAll = async (user: string): Promise<Note[]> => {
  const res = await CLIENT.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': user,
      },
    }),
  );
  const notes = res.Items?.map((item) => ({
    id: item.pk,
    text: item.text,
  }));

  return notes || [];
};

export const getById = async (
  user: string,
  id: number,
): Promise<Note | null> => {
  const res = await CLIENT.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk AND sk = :sk',
      ExpressionAttributeValues: {
        ':pk': user,
        ':sk': id,
      },
    }),
  );
  const note = res.Items?.map((t) => ({
    id: t.pk,
    text: t.text,
  })).pop() as Note;

  console.log({ note });

  return note || null;
};
