import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

import { Image } from '../services/image';
import { StatusCodes } from 'http-status-codes';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const imageId = event.pathParameters!.id!;

  await Image.Mutations.remove(imageId, Image.Shared.Variant.Original);

  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ 200: 'OK' }),
  };
};
