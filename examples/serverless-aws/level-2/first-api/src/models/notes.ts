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

export const create = async (user: string, note: Note): Promise<Note> => {
  const newNote: Note = {
    id: Math.round(Math.random() * 100_000_000),
    text: note.text,
  };
  await DbClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: user,
        sk: newNote.id,
        ...note,
      },
    }),
  );

  return newNote;
};

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

export const getById = async (
  user: string,
  id: number,
): Promise<Note | null> => {
  const res = await DbClient.send(
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
    id: t.sk,
    text: t.text,
  })).pop() as Note;

  return note || null;
};

export const remove = async (user: string, id: number): Promise<void> => {
  await DbClient.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: {
        pk: user,
        sk: id,
      },
    }),
  );
};
