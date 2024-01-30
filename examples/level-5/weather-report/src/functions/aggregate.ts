import { Reading } from './shared';

export const main = async (readings: Reading[]): Promise<Avg> => {
  const len = readings.length;

  return readings
    .reduce(
      (acc, next) => {
        acc[0].avgTemp += next.airTemp;
        acc[0].avgWind += next.windSpeed;
        acc[0].avgPrecipitation += next.precipitation;

        return acc;
      },
      [
        {
          avgTemp: 0,
          avgWind: 0,
          avgPrecipitation: 0,
        },
      ] as Avg[],
    )
    .map((next) => ({
      avgTemp: next.avgTemp / len,
      avgWind: next.avgWind / len,
      avgPrecipitation: next.avgPrecipitation / len,
    }))
    .pop()!;
};

export interface Avg {
  avgTemp: number;
  avgWind: number;
  avgPrecipitation: number;
}
