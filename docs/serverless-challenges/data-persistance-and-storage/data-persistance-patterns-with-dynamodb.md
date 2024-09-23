<script setup>
import Quiz from "../../../components/Quiz.vue"
</script>

# Data Patterns with DynamoDB

In this challenge, you'll implement advanced data patterns using Amazon DynamoDB. These patterns are for handling the complex data requirements of high-traffic, large-scale applications such as e-commerce platforms. DynamoDB's unique features and capabilities make it an ideal choice for ensuring efficient data storage, retrieval, and management in scenarios where performance and scalability are important.

## Challenge Description

Your task is to design and implement a solution using Amazon DynamoDB for a high-traffic e-commerce platform. You'll need to focus on optimizing data storage and access patterns, ensuring efficient retrieval while implementing advanced DynamoDB features. This challenge will teach you to leverage DynamoDB's capabilities like managing diverse entity types, implementing complex query patterns, and ensuring data consistency and durability.

## Technical Requirements

1. Design a single-table DynamoDB schema to store multiple entity types:
    - Products (with categories, attributes, and pricing history)
    - Customer Orders (with line items, status, and payment info)
    - Customer Reviews
    - Inventory Levels
2. Implement efficient access patterns for the following queries:
    - Retrieve all orders for a customer in the last 30 days
    - Find all reviews for a specific product
    - Get the current inventory level for a product
    - Fetch the price history of a product over the last year
3. Utilize DynamoDB's Time to Live (TTL) feature to automatically expire and delete old pricing data after one hour (or another appropriate length for your testing).
4. Implement a data archiving solution:
    - TODO: FIGURE THIS OUT
5. Use DynamoDB's transactional APIs to ensure data consistency when updating related items (e.g., decrementing inventory when placing an order).

## Entity Examples

Here are examples of how the entities might look (without specifying the partition and sort keys):

1. Product:
```json
{
  "productId": "P12345",
  "name": "Wireless Earbuds",
  "category": "Electronics",
  "price": 79.99,
  "attributes": {
    "color": "white",
    "batteryLife": "6 hours"
  },
  "priceHistory": [
    { "date": "2023-01-01", "price": 89.99 },
    { "date": "2023-06-01", "price": 79.99 }
  ]
}
```

2. Customer Order:
```json
{
  "orderId": "O67890",
  "customerId": "C54321",
  "orderDate": "2023-09-15",
  "status": "Shipped",
  "total": 159.98,
  "items": [
    { "productId": "P12345", "quantity": 2, "price": 79.99 }
  ],
  "paymentInfo": {
    "method": "Credit Card",
    "last4": "1234"
  }
}
```

3. Customer Review:
```json
{
  "reviewId": "R13579",
  "productId": "P12345",
  "customerId": "C54321",
  "rating": 4,
  "comment": "Great sound quality, but battery life could be better.",
  "date": "2023-09-20"
}
```

4. Inventory:
```json
{
  "productId": "P12345",
  "quantity": 500,
  "lastUpdated": "2023-09-18"
}
```

## Architecture

<!---
![Architecture Diagram](./data-persistance-patterns-with-dynamodb.png)
-->

## Hints

::: details Hint 1: Single-Table Design
Use a combination of partition key and sort key with prefixes to store multiple entity types in a single table. This allows for flexible querying and reduces the need for table joins.
:::

::: details Hint 2: Indexing Strategy
Carefully plan your Global Secondary Indexes (GSIs) to support the required access patterns efficiently. Remember, you can create up to 20 GSIs per table.
:::

::: details Hint 3: Data Archiving
Look into using AWS Glue and Athena in combination with S3 to make the archived data queryable.
:::

## Resources

- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Best Practices for Designing and Using Partition Keys Effectively](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)
- [DynamoDB Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)
- [Amazon DynamoDB Transactions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transactions.html)
- [Backup and Restore for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/BackupRestore.html)

## Quiz

<Quiz 
  question="Which DynamoDB feature can be used to automatically delete old pricing data after a certain period?"
  :answers="['DynamoDB Streams', 'Time to Live (TTL)', 'Global Secondary Indexes', 'Transactional APIs']"
  :correctAnswer="1"
  :answerInfo="[
    'DynamoDB Streams are used for capturing data modifications in real-time, not for automatic deletion.',
    'Correct! Time to Live (TTL) allows you to define when items in a table expire and be automatically deleted from the database.',
    'Global Secondary Indexes are used for alternative query patterns, not for automatic data deletion.',
    'Transactional APIs ensure consistency across multiple operations, but do not handle automatic data deletion.'
    ]"
/>

<Quiz 
  question="What's the purpose of using a single-table design in DynamoDB for this e-commerce platform?"
  :answers="['To save money on DynamoDB costs', 'To simplify database management', 'To enable efficient querying of related data and reduce the need for joins', 'To increase the storage capacity of DynamoDB']"
  :correctAnswer="2"
  :answerInfo="[
    'While a single-table design can be cost-effective, this is not its primary purpose in this scenario.',
    'Single-table design can complicate database management due to its complexity.',
    'Correct! A single-table design allows for efficient querying of related data and reduces the need for joins, which are not natively supported in DynamoDB.',
    'The storage capacity of DynamoDB is not affected by using a single-table or multi-table design.'
    ]"
/>

<Quiz 
  question="Which AWS service would you use in combination with S3 to query archived order data?"
  :answers="['Amazon RDS', 'Amazon Redshift', 'Amazon Athena', 'Amazon ElastiCache']"
  :correctAnswer="2"
  :answerInfo="[
    'Amazon RDS is a relational database service, not suitable for querying data in S3.',
    'While Amazon Redshift can query S3 data, it\'s primarily used for data warehousing and may be overkill for this scenario.',
    'Correct! Amazon Athena is designed to query data directly from S3 using standard SQL, making it ideal for querying archived data.',
    'Amazon ElastiCache is an in-memory caching service, not used for querying data in S3.'
    ]"
/>

<Quiz 
  question="What DynamoDB feature ensures consistency when updating both order and inventory data simultaneously?"
  :answers="['DynamoDB Streams', 'Global Secondary Indexes', 'Transactional APIs', 'DynamoDB Accelerator (DAX)']"
  :correctAnswer="2"
  :answerInfo="[
    'DynamoDB Streams capture data modifications but don\'t ensure transactional consistency.',
    'Global Secondary Indexes are for query optimization, not for ensuring data consistency.',
    'Correct! Transactional APIs in DynamoDB ensure that multiple actions either all succeed or all fail, maintaining data consistency.',
    'DAX is a caching layer for DynamoDB, not used for ensuring data consistency in transactions.'
    ]"
/>

<Quiz 
  question="Which strategy is used in this challenge to handle long-term storage of old order data?"
  :answers="['Increasing DynamoDB storage capacity', 'Using DynamoDB Streams to copy data', 'Archiving data to S3', 'Creating a separate DynamoDB table for old orders']"
  :correctAnswer="2"
  :answerInfo="[
    'Increasing DynamoDB storage capacity doesn\'t address the need for cost-effective long-term storage.',
    'DynamoDB Streams are not used for long-term data storage.',
    'Correct! The challenge specifies archiving completed orders older than 1 year to S3, which is ideal for cost-effective long-term storage.',
    'Creating a separate table for old orders doesn\'t leverage the benefits of S3 for long-term storage.'
    ]"
/>

