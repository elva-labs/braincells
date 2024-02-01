import { S3Event, SQSEvent } from 'aws-lambda';

import { Image } from '../services/image';

export async function main(event: SQSEvent): Promise<void> {
  const tasks = event.Records.map((record) => {
    let s3Event = JSON.parse(record.body) as S3Event;

    if (!s3Event.Records) {
      return;
    }

    // since this removal is triggered by the original image
    // we need to remove all transformations for that image
    return Image.Mutations.remove('todo', Image.Shared.Variant.Transform);
  });

  await Promise.allSettled(tasks);
}
