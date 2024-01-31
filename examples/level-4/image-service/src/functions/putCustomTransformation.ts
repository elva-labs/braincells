import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Image } from '../services/image';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const result = queryParamSchema.safeParse(event.queryStringParameters);
  const imageName = event.pathParameters!.id!;

  if (!result.success) {
    return { statusCode: StatusCodes.BAD_REQUEST };
  }

  const { data: payload } = result;
  const image = Image.Utils.extractFileName(
    new Image({
      key: imageName,
      format: { height: +payload.height, width: +payload.width },
    }),
  );

  try {
    await ImageService.customTransformation(image);
  } catch (err) {
    console.error(err);

    return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR };
  }

  return { statusCode: StatusCodes.CREATED };
};

const queryParamSchema = z.object({
  key: z.string(),
  width: z.string(),
  height: z.string(),
});
