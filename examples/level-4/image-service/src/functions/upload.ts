import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import lambdaFileParser from 'lambda-multipart-parser';
import { StatusCodes } from 'http-status-codes';
import * as uuid from 'uuid';

import { Image } from '../services/image';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const imageId = uuid.v4().toString();
  const attachment = await lambdaFileParser.parse(event);
  const file = attachment.files.at(0);

  if (!file) {
    return { statusCode: StatusCodes.BAD_REQUEST };
  }

  await Image.Mutations.write({
    key: imageId,
    buf: file.content,
    location: Image.Shared.Variant.Original,
    contentType: file.contentType,
  });

  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify({ image: imageId }),
  };
};
