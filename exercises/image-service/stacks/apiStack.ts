import { StackContext, Api, use } from 'sst/constructs';
import { ImageTransformationStack } from './storageTransformationStack';

export function API({ stack }: StackContext) {
  const { originalImageBucket, transformedImageBucket } = use(
    ImageTransformationStack,
  );

  const api = new Api(stack, 'transformationAPI', {
    routes: {
      "PUT /images": "src/functions/image.uploadImage",
      "GET /images/{id}": "src/functions/image.getImage",
      "DELETE /images/{id}": "src/functions/image.removeImage"
    },

    defaults: {
      function: {},
    },
  });

  stack.addOutputs({
    EndPoint: api.url,
  });

  return {
    apiEndpoint: api.url,
  };
}
