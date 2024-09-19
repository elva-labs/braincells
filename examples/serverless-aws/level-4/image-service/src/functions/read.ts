import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import z from 'zod';

import { Image } from '../services';

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const imageId = event.pathParameters!.id!;
  const result = queryParamSchema.safeParse(event.queryStringParameters);

  if (!result.success) {
    return { statusCode: StatusCodes.BAD_REQUEST };
  }

  const option = result.data;
  const { buf, contentType } = await Image.Read.file(
    imageId,
    Image.Shared.Variant.Original,
  );

  if (!buf) return { statusCode: StatusCodes.NOT_FOUND };

  return {
    statusCode: StatusCodes.TEMPORARY_REDIRECT,
    headers: {
      location: await Image.Read.redirect(
        !option
          ? imageId
          : await Image.Mutations.adhocTransform(imageId, buf, contentType, {
              width: option.w,
              height: option.h,
            }),
      ),
    },
  };
};

const queryParamSchema = z
  .object({
    w: z.string().transform((n) => +n),
    h: z.string().transform((n) => +n),
  })
  .optional();
