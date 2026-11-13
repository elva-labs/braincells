import { StackContext, Function } from 'sst/constructs';

export function LambdaStack({ stack }: StackContext) {
  const helloLambda = new Function(stack, 'stack-fn-id', {
    runtime: 'nodejs22.x',
    handler: 'src/functions/hello.handler',
    url: true,
  });

  stack.addOutputs({
    LambdaUrl: helloLambda.url,
  });
}
