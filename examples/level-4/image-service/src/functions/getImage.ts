import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { z } from 'zod';
import { Bucket } from 'sst/node/bucket';

import ImageService from '../services/imageService';
import { Image } from '../models/image';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const result = queryParamSchema.safeParse(event.queryStringParameters);

  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: '400 - Bad request' }),
    };
  }

  const { data } = result;

  const imageUrl = await ImageService.get();

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: '400 - Bad request' }),
    };
  }

  return {
    statusCode: 307,
    headers: {
      location: imageUrl,
    },
  };
};

const queryParamSchema = z.object({
  key: z.string(),
  bucket: z.enum(['original', 'transformed']),
});
