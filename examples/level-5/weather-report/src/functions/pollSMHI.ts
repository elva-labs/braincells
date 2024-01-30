import * as z from 'zod';
import { Config } from 'sst/node/config';

import { cities } from '../sahred';
import { Reading } from './shared';

export const main = async (): Promise<Reading> => {
  const res = await fetch(
    `${Config.SMHI_ENDPOINT}/lon/${cities[0].longitude}/lat/${cities[0].latitude}/data.json`,
  );
  const data = await res.json();
  const result = responseSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Failed to parse response from SMHI');
  }

  const { timeSeries } = result.data;
  const firstSerie = timeSeries.at(0);

  return {
    airTemp: firstSerie?.parameters[PropertyNums.AirTemp].values.at(0) ?? NaN,
    windSpeed:
      firstSerie?.parameters[PropertyNums.WindSpeed].values.at(0) ?? NaN,
    precipitation:
      firstSerie?.parameters[PropertyNums.Precipitation].values.at(0) ?? NaN,
  };
};

const responseSchema = z.object({
  referenceTime: z.string(),
  timeSeries: z.array(
    z.object({
      validTime: z.string(),
      parameters: z.array(
        z.object({
          name: z.string(),
          values: z.array(z.number()),
        }),
      ),
    }),
  ),
});

enum PropertyNums {
  AirTemp = 10,
  WindSpeed = 14,
  Precipitation = 3,
}
