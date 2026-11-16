import { SSTConfig } from 'sst';
import { LambdaStack } from './stacks/first-stack';

export default {
  config(_input) {
    return {
      name: 'hello-world-lambda',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({ runtime: 'nodejs22.x' });
    app.stack(LambdaStack);
  },
} satisfies SSTConfig;
