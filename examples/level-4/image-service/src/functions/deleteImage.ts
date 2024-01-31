import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { z } from 'zod';

import { Image } from '../models/image';
import ImageService from '../services/imageService';
import { StatusCodes } from 'http-status-codes';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const result = queryParamSchema.safeParse(event.queryStringParameters);

  if (!result.success) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: JSON.stringify({ error: '400 - Bad request' }),
    };
  }

  const { data } = result;

  try {
    await ImageService.removeOriginalImage(new Image({ key: data.key }));
  } catch (err) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: JSON.stringify({ error: '404 - Not found' }),
    };
  }

  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ 200: 'OK' }),
  };
};

const queryParamSchema = z.object({
  key: z.string(),
});
