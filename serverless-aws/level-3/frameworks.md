# Frameworks

## AWS Cloud Development Kit (CDK)

* Type: Infrastructure as Code (IaC) framework.
Purpose: Allows developers to define cloud infrastructure using familiar programming languages like TypeScript, Python, Java, and C#.
* Key Features: It provides high-level components that pre-configure cloud resources with sensible defaults, making it easier to set up complex environments. CDK applications are compiled into AWS CloudFormation templates.

## Serverless Stack (SST)
* Type: Framework for building serverless applications.
* Purpose: Designed to make it easy to build serverless applications with AWS. It extends AWS CDK, offering additional higher-level constructs specifically tailored for serverless architectures.
* Key Features: Includes features like live AWS Lambda development, which allows you to test your Lambda functions locally while connected to your deployed AWS resources. SST supports various AWS services and simplifies their configuration and deployment.

## Serverless Framework
* Type: Framework for building and deploying serverless applications.
* Purpose: Focuses on simplifying the deployment of serverless applications to AWS Lambda and other serverless platforms like Azure Functions and Google Cloud Functions.
* Key Features: Offers a simple, YAML-based syntax to define the functions and the events that trigger them. It automates the deployment of your serverless application to the cloud provider of your choice. The Serverless Framework also has a rich plugin ecosystem, enabling integration with other tools and services.

## TLDR
Each of these frameworks serves a specific purpose within the realm of cloud and serverless computing, offering unique features and capabilities to streamline the development and deployment of cloud-native applications. 

:::tip 
At the time of writing, we mostly make use of SST and fallback to CDK if needed.
:::
