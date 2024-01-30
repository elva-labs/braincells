import { describe, it, expect } from 'vitest';
import { Config } from 'sst/node/config';

import { getStateMachine, testState } from './util';

describe('Weather Machine', async () => {
  const stateMachine = await getStateMachine(Config.STATE_MACHINE_ARN);

  it('should return reading from SMHI', async () => {
    const res = await testState({
      stateMachineArn: stateMachine.stateMachineArn as string,
      taskName: 'PollSMHI',
    });

    expect(res).keys(['airTemp', 'windSpeed', 'precipitation']);
    expect(typeof res.airTemp).toBe('number');
    expect(typeof res.windSpeed).toBe('number');
    expect(typeof res.precipitation).toBe('number');
  });

  it('should return reading from YR', async () => {
    const res = await testState({
      stateMachineArn: stateMachine.stateMachineArn as string,
      taskName: 'PollYR',
    });

    expect(res).keys(['airTemp', 'windSpeed', 'precipitation']);
    expect(typeof res.airTemp).toBe('number');
    expect(typeof res.windSpeed).toBe('number');
    expect(typeof res.precipitation).toBe('number');
  });

  it('should return averages of weather data', async () => {
    const res = await testState({
      stateMachineArn: stateMachine.stateMachineArn as string,
      taskName: 'Aggregator',
      input: JSON.stringify([
        {
          airTemp: 3,
          windSpeed: 2,
          precipitation: 1,
        },
        {
          airTemp: 6,
          windSpeed: 13,
          precipitation: 4,
        },
      ]),
    });

    expect(res).keys(['avgTemp', 'avgWind', 'avgPrecipitation']);
    expect(res.avgTemp).toEqual(4.5);
    expect(res.avgWind).toEqual(7.5);
    expect(res.avgPrecipitation).toEqual(2.5);
  });
});
