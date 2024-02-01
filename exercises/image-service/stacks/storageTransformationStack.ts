import { StackContext, Bucket, Queue, EventBus } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';

export function ImageTransformationStack({ stack }: StackContext) {
  /**
   * Quees
   */
  const transformationQueue = new Queue(stack, 'ImageTransformationQueue', {
    consumer: 'src/functions/createDefaultTransformation.main',
  });
  const deletionQueue = new Queue(stack, 'ImageDeletionQueue', {
    consumer: 'src/functions/deleteTransformations.main',
  });

  /**
   * Storage
   */
  const originalImagesBucket = new Bucket(stack, 'OriginalImagesBucket', {
    cdk: {
      bucket: { autoDeleteObjects: true, removalPolicy: RemovalPolicy.DESTROY },
    },
    notifications: {
      transformNotification: {
        type: 'queue',
        queue: transformationQueue,
        events: ['object_created'],
      },
      deleteNotification: {
        type: 'queue',
        queue: deletionQueue,
        events: ['object_removed'],
      },
    },
  });
  const transformedImagesBucket = new Bucket(stack, 'TransformedImagesBucket', {
    cdk: {
      bucket: {
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
        eventBridgeEnabled: true,
      },
    },
  });

  /**
   * Default event bus + rules
   */
  const defalutBus = new EventBus(stack, 'DefaultEventBus', {
    cdk: {
      eventBus: events.EventBus.fromEventBusName(
        stack,
        'ImportedBus',
        'default',
      ),
    },
    rules: {
      imageTransformedRule: {
        pattern: {
          source: ['aws.s3'],
          detailType: ['Object Created'],
          detail: {
            object: {
              key: [{ wildcard: '*size-l*' }, { wildcard: '*size-*x*' }],
            },
          },
        },
        targets: {
          sendEmailNotification: 'src/functions/sendEmail.main',
        },
      },
    },
  });

  deletionQueue.attachPermissions(['s3']);
  transformationQueue.attachPermissions(['s3']);
  defalutBus.attachPermissions(['ses']);
  defalutBus.attachPermissions(['s3']);
  transformationQueue.bind([originalImagesBucket, transformedImagesBucket]);
  deletionQueue.bind([originalImagesBucket, transformedImagesBucket]);

  stack.addOutputs({
    OriginalImageBucketName: originalImagesBucket.bucketName,
    TransformedImageBucketName: transformedImagesBucket.bucketName,
    TransformationQueueName: transformationQueue.queueName,
    EventBus: defalutBus.eventBusName,
  });

  return {
    originalImageBucket: originalImagesBucket,
    transformedImageBucket: transformedImagesBucket,
    transformationQueue,
    eventBus: defalutBus,
  };
}
