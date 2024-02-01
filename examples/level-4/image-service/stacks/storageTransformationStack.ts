import { StackContext, Bucket, Queue, EventBus } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';

export function ImageTransformationStack({ stack }: StackContext) {
  return {
    originalImageBucket: originalImagesBucket,
    transformedImageBucket: transformedImagesBucket,
    transformationQueue,
    eventBus: defalutBus,
  };
}
