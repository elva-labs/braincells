# Hello World (Lambda)

::: info
In this exercise you will learn:
1. What Lamba is
2. What a cloudfromation & CDK / SST is
3. How to deploy & remove assets from AWS
:::


## Lambda 

AWS Lambda is a serverless compute service provided by Amazon Web Services (AWS) that allows you to run code in response to events and triggers. It eliminates the need to manage servers, automatically scales with the workload, supports various programming languages, and charges you only for the compute resources used during code execution. AWS Lambda is ideal for building cost-effective, scalable, and event-driven applications across a wide range of use cases, from web APIs to real-time data processing and automation.


In short, we can define code handlers (just normal functions). These handlers inform the AWS runtime of which functions to execute based on internal events originating from other AWS services.

If you want a bit more details, look [here](./anatomy-of-lambda.md)


```ts
// This handler is invoked base on some internal event that occur in AWS
// that we define for the given lambda configuration.
// Events can be anything from a HTTP request to a mroe custom async trigger.
export const handler = (event) => {
 // Do something with the event or just react on the event itself
} 
```

## Infrastructure as Code (IaC) 

IaC is a practice in cloud computing and DevOps that involves defining and managing infrastructure configurations using code and automation tools. Instead of manually configuring servers, networks, and other infrastructure components, IaC allows you to express your infrastructure requirements in code, typically using domain-specific languages (DSLs) or configuration files.

### AWS Cloud Development Kit (CDK)
CDK is an open-source software development framework provided by Amazon Web Services (AWS). It allows developers to define cloud infrastructure resources and configurations using familiar programming languages, such as TypeScript, Python, Java, C#, and others, rather than traditional Infrastructure as Code (IaC) templates.

CDK simplifies the process of defining and managing cloud infrastructure, making it easier for developers to create, deploy, and manage AWS resources using their preferred programming languages and development practices. It's particularly useful for projects that require the flexibility and expressiveness of code while harnessing the power of AWS cloud services.

### Serverless Stack (SST)
[Serverless Stack](https://sst.dev/) is an open-source framework for building serverless applications on AWS (Amazon Web Services). It simplifies the process of developing, deploying, and managing serverless applications by providing a set of abstractions and tools. Serverless Stack typically leverages AWS services like AWS Lambda, API Gateway, DynamoDB, and others to create scalable and cost-effective serverless applications.

## Exercise

From the start, we'll do most things manually. However, there are a broad rage of project-generators one could use down the line to make things faster (and maybe bore reliable).

1. Create a new project
2. Write a lambda 
3. Deploy
4. Test it manually (We'll explore automated tests down the line)
5. Remove the project / resources

:::tip
When in doubt look at the reference project here
:::

### 1. Creating a Project

```bash
# create a new directory for you project
mkdir my-first-lambda

# initiate a new node project
pnpm init
```

Open the package.json with whatever editor you like, add these dependencies.
```json
{
  "name": "my-first-lambda",
  ...
  "devDependencies": {
    "@tsconfig/node18": "18.2.2",
    "@types/aws-lambda": "8.10.124",
    "aws-cdk-lib": "2.95.1",
    "aws-lambda": "1.0.7",
    "constructs": "10.2.69",
    "sst": "2.28.1",
    "typescript": "5.2.2",
    "@aws-sdk/client-dynamodb": "3.427.0",
    "@aws-sdk/lib-dynamodb": "3.427.0",
    "@types/node": "20.8.4"
  }
}
```

2. Install the project dependencies `pnpm i`.

3. Add some more folders to make things somewhat pretty, and add the last configuration files.

```bash
mkdir -p src/functions stacks && touch sst.config.ts tsconfig.json
```

Add the following in respective file
```ts 
// sst.config.ts

import { SSTConfig } from 'sst';

export default {
  config(_input) {
    return {
      name: 'my-first-lambda',
      region: 'eu-north-1',
    };
  },
  stacks(app) {},
} satisfies SSTConfig;

```

```json 
// tsconfig.ts

{
  "extends": "@tsconfig/node18/tsconfig.json",
  "exclude": [],
  "include": [
    "src"
  ],
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node"
  }
}
```

### 4. Writing the Lambda

It is now time to define our "event-hook", the function that AWS will call
when something happens, in our case a HTTP request.

```ts
// src/functions/first.ts

export const handler = async () => {
  console.log("I'm running on the server")

  return {
    "statusCode": 200,
    "body": JSON.stringify({ hello: 'world' }),
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

### 5. Adding our Infrastructure

1. `touch stack/first-stack.ts`

```ts
// stacks/first-stack.ts
import { StackContext, Function } from "sst/constructs";

export function FirstStack({ stack }: StackContext) {
  // create the lambda resource  
  const helloLambda = new Function(stack, 'stack-fn-ref', {
    // Note: We point to the actual function <file-path>.<function-symbol>
    handler: 'src/functions/first.handler',

    // This settings tells AWS to expose a dedicated endpoint for our lambda
    url: true
  })

  
  // Add our endpoint to the output(terminal & the deployed stack) for easy access
  stack.addOutputs({
    LambdaUrl: helloLambda.url,
  });
}
```

Register the new stack so SST becomes aware of it.

```ts
// sst.config.ts

import { SSTConfig } from "sst";
// add the following line
import { FirstStack } from "./stacks/first-stack";

export default {
  config(_input) {
    return {
      name: "my-first-lambda",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    // and this line
    app.stack(FirstStack);
  }
} satisfies SSTConfig;
```

### 6. Scripts 

We often add usefull scripts to the package.json file to simply project 
management when it comes to things like: deployment, test, and other checks.

In our case, we want to add two, one for typechecking, project deployment, and finally teardown (delete).

```json
// package.json

{
  "name": "my-first-lambda",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "sst dev",
    "deploy": "sst deploy",
    "remove": "sst remove",
    ...
  },
  ...
}
```

### 6. Deploy 

Run `pnpm run deploy` to run the `deploy` script that we defined in the `package.json`, which in turn will 
run sst and deploy our infrastructure. Take a COB (HALT/COFFEE BREAK) while everything settles in. 

### 7. Test
The terminal will eventually output the link to your lambda. Once you use that link in a broswer or `curl` a request / event will be triggered to AWS that will invoke the deployed lambda and produce a response. 


```bash
curl https://ksei4ctj3fqms4o3n4t2wnrdem0okgrp.lambda-url.eu-north-1.on.aws/ 

# {"hello":"world"}

```

You'll be able to see the execution logs in the terminal.



> Note: during dev-move, requests are proxied to your local system, if you instead use the deploy cmd, the code will be packged and published to AWS, and then the "actual" lambda srouce in the cloud will produce the response.

### 8. Remove
...
