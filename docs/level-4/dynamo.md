# AWS DynamoDB

**AWS DynamoDB** is a fully-managed NoSQL database service provided by Amazon Web Services (AWS), known for its fast performance and scalability. It's designed to handle large-scale, low-latency workloads and is a popular choice for web, mobile, gaming, and IoT applications.

```ts
import { Table } from "sst/constructs";

new Table(stack, "Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: { partitionKey: "noteId", sortKey: "userId" },
});
```

[SST docs](https://docs.sst.dev/constructs/Table)

## Key Features

- **Performance at Scale**: Offers fast and predictable performance, even as it scales to handle massive amounts of data and traffic.
- **Fully Managed**: Being fully managed, it eliminates the need for manual tasks such as hardware provisioning, setup, configuration, and scaling.
- **Flexible Data Model**: Supports both document and key-value data models, offering flexibility in how data is stored and retrieved.
- **High Availability and Durability**: Automatically replicates data across multiple AWS Availability Zones to ensure high availability and data durability.
- **Built-in Security**: Includes built-in security features such as encryption at rest, and fine-grained access control.

## When to Use AWS DynamoDB

- **Real-Time Applications**: Ideal for applications requiring real-time data access, such as mobile apps, web apps, gaming, and real-time analytics.
- **Serverless Architectures**: Works seamlessly with AWS Lambda and other AWS serverless services, making it a good fit for serverless applications.
- **Scalable Web Applications**: Suitable for web applications that experience variable and unpredictable workloads, as it can automatically scale up and down.
- **IoT Applications**: Can handle the high throughput required by IoT applications, efficiently storing and retrieving data from millions of devices.
- **Microservices Architectures**: Due to its scalability and performance, it is well-suited for microservices architectures where individual services require their own database.

AWS DynamoDB stands out as an excellent choice for scenarios requiring a high-performance, scalable, fully managed NoSQL database. Its compatibility with various data models and integration with other AWS services make it a versatile solution for a wide range of applications, from small startups to large enterprises.

[AWS docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStartedDynamoDB.html)
