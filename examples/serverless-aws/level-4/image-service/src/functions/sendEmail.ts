import { S3ObjectCreatedNotificationEvent } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export async function main(event: S3ObjectCreatedNotificationEvent) {
  const client = new SESClient();

  const transformedImage = event.detail.object;

  const input = {
    Source: 'joel.roxell@elva-group.com',
    Destination: {
      ToAddresses: ['success@simulator.amazonses.com'],
    },
    Message: {
      Subject: {
        Data: `Image transformation complete`,
      },
      Body: {
        Text: {
          Data: `The transformation of image ${transformedImage.key} is finished!`,
        },
        HTML: {
          Data: 'TEST',
        },
      },
    },
  };

  const sendEmailCommand = new SendEmailCommand(input);

  try {
    const response = await client.send(sendEmailCommand);

    console.log('Email response: ', response);
  } catch (e) {
    console.error('error', e, 'Failed to send email.');
  }
}
