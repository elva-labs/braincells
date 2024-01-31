import { S3Event, SQSEvent } from 'aws-lambda';

import { Image } from '../services/image';

export async function main(event: SQSEvent): Promise<void> {
  const tasks = event.Records.map((record) => {
    let s3Event = JSON.parse(record.body) as S3Event;

    if (!s3Event.Records) {
      return;
    }

    // TODO: find image keys
    return Image.Mutations.remove('todo', Image.Shared.Variant.Original);
  });

  await Promise.allSettled(tasks);
}
