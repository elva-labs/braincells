<script setup>
import QuizComponent from "../../components/Quiz.vue"
</script>

# Introduction to AWS

<QuizComponent />

## Overview
In Module 1, we will start on our journey into the world of serverless computing by first gaining a solid understanding of Amazon Web Services (AWS). AWS is the leading cloud service provider that offers a vast array of services, including those essential for serverless application development. This module serves as a foundational introduction to AWS, setting the stage for our subsequent exploration of serverless technologies.

## Learning Objectives
By the end of this module, you will:

1. Understand Cloud Computing: Grasp the fundamental concepts of cloud computing, including the advantages of cloud-based solutions over traditional on-premises infrastructure.

2. Familiarize with AWS Services: Explore key AWS services and their roles in building serverless applications.

3. Set Up AWS Account: Learn how to sign up for an AWS account and configure the AWS Command Line Interface (CLI) for interacting with AWS resources.

## Topics Covered

### Cloud Computing Basics
* What is Cloud Computing?
* Types of Cloud Services (IaaS, PaaS, SaaS)

### Introduction to AWS
* AWS Global Infrastructure
* AWS Service Categories (Compute, Storage, Database, Networking, etc.)
* AWS Pricing Models

### Getting Started with AWS
* Creating an AWS Account
* Navigating the AWS Management Console
* Setting Up AWS CLI

## Why AWS?
AWS provides a comprehensive cloud platform that is ideal for serverless application development. Its extensive service offerings, global reach, and robust ecosystem make it a top choice for businesses and developers worldwide. By mastering AWS, you'll have the tools and resources needed to build scalable, cost-effective, and highly available serverless solutions.

## Cloud Computing  

Cloud computing is a technology model that enables the delivery of computing resources and services over the internet. Instead of owning and managing physical servers and data centers, individuals and organizations can access and use computing resources, such as servers, storage, databases, networking, software, and more, from cloud service providers.

::: tip
Cloud computing allows developers to focus solely on writing code without worrying about server management.
:::

### Characteristics of cloud computing

* __On-Demand Self-Service__: Users can provision and manage resources as needed, without requiring human intervention from the service provider.

* __Resource Pooling__: Cloud providers use multi-tenant models where resources are shared among multiple users while remaining logically isolated. This efficiency leads to cost savings.

* __Rapid Elasticity__: Cloud resources can be quickly scaled up or down to accommodate changes in demand. This elasticity allows users to pay only for the resources they consume.

* __Pay-as-you-go/Measured Service__: Cloud providers offer a metered service, meaning users are billed based on their actual usage of resources. This pay-as-you-go model is cost-effective and flexible.

### Cloud computing is typically categorized into three service models:

* __Infrastructure as a Service (IaaS)__: Provides virtualized computing resources over the internet. Users can rent virtual machines, storage, and networking infrastructure.

* __Platform as a Service (PaaS)__: Offers a platform that includes the underlying infrastructure, as well as development and deployment tools. Developers can focus on building and deploying applications without worrying about managing the infrastructure.

* __Software as a Service (SaaS)__: Delivers complete software applications over the internet. Users access software and its features through a web browser, eliminating the need for local installation and maintenance.

Cloud computing has transformed the way businesses and individuals manage their IT infrastructure. It offers benefits such as scalability, cost-efficiency, agility, and the ability to access resources from anywhere with an internet connection. Major cloud providers, including Amazon Web Services (AWS), ~~Microsoft Azure~~, and ~~Google Cloud Platform (GCP)~~, offer a wide range of services and solutions that cater to various computing needs, including serverless computing, which is a specific approach to __cloud computing that allows developers to focus solely on writing code without worrying about server management__.

## Pricing
Amazon Web Services (AWS) offers a flexible and pay-as-you-go pricing model that allows users to pay for the cloud services and resources they consume. This pricing model is designed to provide cost-effective solutions for a wide range of users, from startups to enterprises.

* __Pay-as-You-Go__: AWS operates on a pay-as-you-go basis, meaning you are charged only for the services and resources you use. There are no upfront costs or long-term commitments required.

* __On-Demand Pricing__: On-demand instances are available for users who need resources without any long-term commitment. You can start, stop, or terminate instances as needed, and you'll be billed by the hour or second for the compute capacity you consume.

* __Reserved Instances (RIs)__: For users with predictable workloads, AWS offers the option to purchase RIs. RIs provide significant cost savings compared to on-demand pricing, but they require a commitment for a one- or three-year term. RIs come in various types, including Standard RIs and Convertible RIs, allowing for flexibility in terms of instance types and sizes.

* __Spot Instances__: Spot instances allow you to bid on unused AWS capacity, often resulting in substantial cost savings. However, they can be terminated by AWS with very short notice when capacity becomes scarce. Spot Instances are ideal for fault-tolerant and batch processing workloads.

* __Free Tier__: AWS offers a Free Tier with limited resources for the first 12 months after signing up. This allows users to explore and experiment with AWS services at no cost.

* __Data Transfer Costs__: AWS charges for data transfer between AWS services and regions. Data transfer into AWS is often free or heavily discounted, while outbound data transfer to the internet or other AWS regions may incur charges.

* __Storage Costs__: AWS offers a variety of storage services with different pricing structures, such as Amazon S3 (object storage), Amazon EBS (block storage), and Amazon RDS (relational database storage). Prices vary based on storage type, size, and usage.


::: tip
 __Cost Explorer and Billing Dashboard__: AWS provides tools like AWS Cost Explorer and the Billing Dashboard to help users monitor and analyze their usage and spending, making it easier to manage costs and optimize resources.
:::

 It's important for AWS users to regularly monitor their resource usage, leverage cost-saving options like RIs and Savings Plans where appropriate, and adjust their infrastructure to optimize costs. AWS also offers cost management and optimization recommendations to help users control and reduce their cloud spending.



##  Key Takeaways
* Cloud computing is a game-changer, offering flexibility, scalability, and cost-efficiency.
* AWS is a leading cloud provider with a vast array of services for various use cases.
* Getting started with AWS is accessible, and the AWS CLI is a powerful tool for managing AWS resources programmatically.

## Next Steps
Now that you have a basic understanding of AWS, we're ready to dive deeper into serverless computing. In the upcoming modules, we'll explore AWS Lambda, event-driven architectures, and more, as we build practical serverless applications.

This module provides an essential foundation for your serverless journey by introducing the cloud computing concepts and AWS services that you'll leverage throughout the curriculum.
