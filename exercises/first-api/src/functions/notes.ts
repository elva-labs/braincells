import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

import * as notes from '../models/notes';

export const getSingle = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const noteId = event.pathParameters?.id;
  const user = event.headers['x-api-key']!;

  if (!noteId) {
    return {
      statusCode: 401,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await notes.getById(user, +noteId)),
  };
};
