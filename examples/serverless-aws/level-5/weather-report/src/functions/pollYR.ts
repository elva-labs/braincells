import * as z from 'zod';
import { Config } from 'sst/node/config';

import { Reading, cities } from './shared';

export const main = async (): Promise<Reading> => {
  const response = await fetch(
    `${Config.YR_ENDPOINT}?lat=${cities[0].latitude}&lon=${cities[0].longitude}`,
  );
  const result = YrSchema.safeParse(await response.json());

  if (!result.success) {
    throw new Error('Failed to parse result data from YR');
  }

  const { timeseries } = result.data.properties;
  const timeSeries = timeseries[0];
  const { air_temperature, wind_speed } = timeSeries.data.instant.details;
  const { precipitation_amount } = timeSeries.data.next_1_hours!.details;

  return {
    airTemp: air_temperature,
    windSpeed: wind_speed,
    precipitation: precipitation_amount,
  };
};

const YrSchema = z.object({
  properties: z.object({
    timeseries: z
      .array(
        z.object({
          time: z.string(),
          data: z.object({
            instant: z.object({
              details: z.object({
                air_temperature: z.number(),
                wind_speed: z.number(),
              }),
            }),
            next_1_hours: z
              .object({
                details: z.object({
                  precipitation_amount: z.number(),
                }),
              })
              .optional(),
          }),
        }),
      )
      .min(1),
  }),
});

export default main;
