import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import * as notes from '../models/notes';

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
