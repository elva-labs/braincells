import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

import * as notes from '../models/notes';

export const getSingle = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const noteId = event.pathParameters!.id!;
  const user = event.headers['x-api-key']!;
  const note = await notes.getById(user, +noteId);

  if (!note) {
    return { statusCode: 404 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(note),
  };
};

export const getAll = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const user = event.headers['x-api-key']!;

  const listOfNotes = await notes.getAll(user);

  return {
    statusCode: 200,
    body: JSON.stringify(listOfNotes),
  };
};

export const create = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const payload = JSON.parse(event.body ?? '') as Note;
  const user = event.headers['x-api-key']!;

  const note = await notes.create(user, payload);

  return {
    statusCode: 201,
    body: JSON.stringify(note),
  };
};

export const remove = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const noteId = event.pathParameters!.id!;
  const user = event.headers['x-api-key']!;

  await notes.remove(user, +noteId);

  return {
    statusCode: 204,
  };
};

interface Note {
  id: number;
  text: string;
}
