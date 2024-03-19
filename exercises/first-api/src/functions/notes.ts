import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import * as notes from '../models/notes';

interface Note {
  id: number;
  text: string;
}

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

export const getSingle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  const user = event.headers['x-api-key']!;
  const noteId = event.pathParameters!.id!;
  const singleNote = await notes.getSingle(user, +noteId);

  if (!singleNote) {
    return {statusCode: 404};
  }

  return {
    statusCode: 200,
    body: JSON.stringify(singleNote)
  }
}

export const addNote = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  const user = event.headers['x-api-key']!;
  const payload = JSON.parse(event.body ?? '') as Note;

  const singleNote = await notes.addNote(user, payload);

  return {
    statusCode: 201,
    body: JSON.stringify(singleNote)
  }
}

export const removeNote = async (
  event: APIGatewayProxyEvent, note: Note
): Promise<APIGatewayProxyResultV2> => {
  const user = event.headers['x-api-key']!;
  const id = event.pathParameters!.id!;

  await notes.removeNote(user, +id)

  return {
    statusCode: 204,
  }
}
