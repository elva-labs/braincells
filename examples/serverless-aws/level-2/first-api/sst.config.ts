import { SSTConfig } from 'sst';
import { API } from './stacks/api-stack';
import { DB } from './stacks/db-stack';

export default {
  config(_input) {
    return {
      name: 'first-rest-api',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({ runtime: 'nodejs22.x' });
    app.stack(DB);
    app.stack(API);
  },
} satisfies SSTConfig;
