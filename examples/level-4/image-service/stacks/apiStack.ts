import { StackContext, Api, use } from 'sst/constructs';
import { ImageTransformationStack } from './storageTransformationStack';

export function API({ stack }: StackContext) {
  const { originalImageBucket, transformedImageBucket } = use(
    ImageTransformationStack,
  );

  const api = new Api(stack, 'transformationAPI', {
    routes: {
      'DELETE     /image/{id}': 'src/functions/deleteImage.main',
      'PUT        /images/{id}/transform':
        'src/functions/putCustomTransformation.main',
      'PUT        /images/{id}': 'src/functions/putStandardTransformation.main',
      'GET        /images/{id}': 'src/functions/getImage.main',
    },

    defaults: {
      function: {
        bind: [originalImageBucket, transformedImageBucket],
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
