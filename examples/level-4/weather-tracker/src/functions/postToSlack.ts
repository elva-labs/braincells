import { Config } from 'sst/node/config';

import { Avg } from './aggregate';

export const main = async (input: Avg) => {
  if (!Config.SLACK_WEBHOOK) {
    throw new Error("Can't send message to slack since the webhook is missing");
  }

  const response = await fetch(Config.SLACK_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      text: `Average tmp today: ${input.avgTemp}C`,
    }),
  });

  if (!response.ok) {
    const err = await response.text();

    console.warn({ err });

    throw new Error('Failed to send slack msg');
  }
};
