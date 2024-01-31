import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Sharp from 'sharp';
import { Bucket } from 'sst/node/bucket';

const S3_CLIENT = new S3Client({});
const EXPIRATION_TIME = 600; // Presigned Url is active for 10 minutes

export namespace Image {
  export namespace Read {
    export const get = async (
      bucket: string,
      key: string,
    ): Promise<string | null> => await generatePresignedUrl(bucket, key);

    export const file = async (
      key: string,
      v: Shared.Variant,
    ): Promise<{ buf: Shared.File; contentType: string }> => {
      const response = await S3_CLIENT.send(
        new GetObjectCommand({
          Bucket: Utils.getBucketName(v),
          Key: key,
        }),
      );

      const data =
        (await response.Body?.transformToByteArray()) ?? new Uint8Array();
      const contentType = response.ContentType!;

      return { buf: data, contentType };
    };

    const generatePresignedUrl = async (
      bucket: string,
      key: string,
      buf?: Buffer,
    ): Promise<string | null> => {
      if (!buf) {
        try {
          return await getSignedUrl(
            S3_CLIENT,
            new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            }),
            {
              expiresIn: EXPIRATION_TIME,
            },
          );
        } catch (err) {
          console.log('error: ', err);
        }
      } else {
        try {
          return await getSignedUrl(
            S3_CLIENT,
            new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: buf,
            }),
            {
              expiresIn: EXPIRATION_TIME,
            },
          );
        } catch (err) {
          console.log('error', err);
        }
      }
      return null;
    };
  }

  export namespace Mutations {
    export const remove = async (
      key: string,
      v: Shared.Variant,
    ): Promise<void> => {
      try {
        await S3_CLIENT.send(
          new DeleteObjectCommand({
            Bucket: Utils.getBucketName(v),
            Key: key,
          }),
        );
      } catch (err) {
        console.log('error', err);
      }
    };

    export const adhocTransform = async (
      buf: Shared.File,
      contentType: string,
      opt: {},
    ): Promise<void> => {
      try {
        const variantBuf = await Image.Utils.resizeImage(buf, {
          height: 100,
          width: 100,
        });
        const variantKey = Utils.generateImageKey(contentType);

        await write({
          key: variantKey,
          buf: variantBuf,
          location: Shared.Variant.Transform,
          contentType: contentType,
        });
      } catch (err) {
        console.log('error', err);
      }
    };

    export const write = async (
      opt: Shared.ImageOpt,
    ): Promise<string | void> => {
      await S3_CLIENT.send(
        new PutObjectCommand({
          Key: opt.key,
          Bucket: Utils.getBucketName(opt.location),
          Body: opt.buf,
          ContentType: opt.contentType,
        }),
      );
    };

    export const createDefaultTransformation = async (
      key: string,
    ): Promise<void> => {
      const { contentType, buf } = await Image.Read.file(
        key,
        Shared.Variant.Original,
      );

      for (let size in DEFAULT_SETTINGS) {
        const key = await Mutations.adhocTransform(buf, contentType, {});
      }
    };
  }

  export namespace Utils {
    export const resizeImage = async (
      buf: Shared.File,
      settings: {
        width: number;
        height: number;
      },
    ): Promise<Shared.File> =>
      await Sharp(buf).resize(settings.width, settings.height).toBuffer();

    export const getBucketName = (v: Shared.Variant): string =>
      v == Shared.Variant.Original
        ? Bucket.OriginalImagesBucket.bucketName
        : Bucket.TransformedImagesBucket.bucketName;

    export const generateImageKey = (
      name: string,
      settings: any = {},
    ): string => {
      const md5 = JSON.stringify(settings ?? '{}');

      return `${name}-${md5} `;
    };
  }

  export namespace Shared {
    export type File = Buffer | Uint8Array;

    export enum Variant {
      Original,
      Transform,
    }

    export interface ImageOpt {
      key: string;
      buf: File;
      location: Variant;
      contentType: string;
    }
  }
}

const DEFAULT_SETTINGS = {
  Small: 100,
  Medium: 200,
  Large: 300,
};
