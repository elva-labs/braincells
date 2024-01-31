import { S3Event, SQSEvent } from 'aws-lambda';

import { Image } from '../services/image';

export async function main(event: SQSEvent) {
  const tasks = event.Records.map((record) => {
    const s3Event = JSON.parse(record.body) as S3Event;

    if (!s3Event.Records) {
      return;
    }

    const s3Object = s3Event.Records.pop()!;

    return Image.Mutations.createDefaultTransformation(s3Object.s3.object.key);
  });

  await Promise.allSettled(tasks);
}
