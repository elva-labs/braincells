import { StackContext, Api, use } from 'sst/constructs';
import { ImageTransformationStack } from './storageTransformationStack';

export function API({ stack }: StackContext) {
  const { originalImageBucket, transformedImageBucket } = use(
    ImageTransformationStack,
  );

  const api = new Api(stack, 'transformationAPI', {
    routes: {},

    defaults: {
      function: {
        runtime: 'nodejs22.x',
      },
    },
  });

  stack.addOutputs({
    EndPoint: api.url,
  });

  return {
    apiEndpoint: api.url,
  };
}
