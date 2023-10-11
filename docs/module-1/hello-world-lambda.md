# Hello World (Lambda)

::: info
In this exercise you will learn:
1. What Lamba is
2. What a cloudfromation & CDK / SST is
3. How to deploy & remove assets from AWS
:::


## Lambda 

AWS Lambda is a serverless compute service provided by Amazon Web Services (AWS) that allows you to run code in response to events and triggers. It eliminates the need to manage servers, automatically scales with the workload, supports various programming languages, and charges you only for the compute resources used during code execution. AWS Lambda is ideal for building cost-effective, scalable, and event-driven applications across a wide range of use cases, from web APIs to real-time data processing and automation.

```ts
export const handler = (event) => {
 /* Do something with the event or just react on the event itself */
} 
```

## Infrastructure as Code (IaC) 

IaC is a practice in cloud computing and DevOps that involves defining and managing infrastructure configurations using code and automation tools. Instead of manually configuring servers, networks, and other infrastructure components, IaC allows you to express your infrastructure requirements in code, typically using domain-specific languages (DSLs) or configuration files.

### AWS Cloud Development Kit (CDK)
CDK is an open-source software development framework provided by Amazon Web Services (AWS). It allows developers to define cloud infrastructure resources and configurations using familiar programming languages, such as TypeScript, Python, Java, C#, and others, rather than traditional Infrastructure as Code (IaC) templates.

CDK simplifies the process of defining and managing cloud infrastructure, making it easier for developers to create, deploy, and manage AWS resources using their preferred programming languages and development practices. It's particularly useful for projects that require the flexibility and expressiveness of code while harnessing the power of AWS cloud services.

### Serverless Stack (SST)
(Serverless Stack)[https://sst.dev/] is an open-source framework for building serverless applications on AWS (Amazon Web Services). It simplifies the process of developing, deploying, and managing serverless applications by providing a set of abstractions and tools. Serverless Stack typically leverages AWS services like AWS Lambda, API Gateway, DynamoDB, and others to create scalable and cost-effective serverless applications.

## Exercise

1. Create a new project
2. Write a lambda 
3. Deploy
4. Test it manually


### Creating a Project
```bash
pnpm create sst my-sst-app
```

### Writing the Lambda
...

### Deploy 
...

### Test
...
