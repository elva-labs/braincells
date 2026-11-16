import { SSTConfig } from 'sst';
import { weatherPollMachine } from './stacks/WeatherPollMachine';

export default {
  config(_input) {
    return {
      name: 'weather-tracker',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({ runtime: 'nodejs22.x' });
    app.stack(weatherPollMachine);
  },
} satisfies SSTConfig;
