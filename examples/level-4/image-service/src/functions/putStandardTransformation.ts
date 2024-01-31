import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import lambdaFileParser from 'lambda-multipart-parser';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Image } from '../services/image';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const result = queryParamSchema.safeParse(event.queryStringParameters);
  const key = event.pathParameters!.id!;

  if (!result.success && !event.body) {
    return { statusCode: StatusCodes.BAD_REQUEST };
  }

  const attachment = await lambdaFileParser.parse(event);
  const file = attachment.files.at(0);

  if (!file) {
    return { statusCode: StatusCodes.BAD_REQUEST };
  }

  await Image.Mutations.write({
    key,
    buf: file.content,
    location: Image.Shared.Variant.Original,
    contentType: file.contentType,
  });

  return { statusCode: StatusCodes.OK };
};

const queryParamSchema = z.object({
  key: z.string(),
});
