import { SSTConfig } from 'sst';
import { API } from './stacks/apiStack';
import { ImageTransformationStack } from './stacks/storageTransformationStack';

export default {
  config(_input) {
    return {
      name: 'imageTransformer',
      region: 'eu-north-1',
    };
  },
  stacks(app) {
    app
      .stack(ImageTransformationStack)
      .stack(API)
  },
} satisfies SSTConfig;
