# SST

:::tip
We'll use some of these constructs later on in this course.
:::

## What's Happening Here? 

SST enhances the functionality of CDK by introducing an additional layer that simplifies the use of certain constructs. Below are some of the most commonly utilized constructs in SST that you will likely find indispensable in your development process.

## Common Constructs 

### Lambda / Function

This construct create a new [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html), it uploads the code that exist in the given path. Internally,
SST will determine runtime etc., however you can override default settings if you need to. 

```ts
import { Function } from "sst/constructs";

new Function(stack, "MyFunction", {
  handler: "src/lambda.handler",
  bind: [...]  // Binds resource permissions to the lambda
  permissions: [...] // Gives global access to services within the account
});
```

[SST docs](https://docs.sst.dev/constructs/Function)

### Api

Nothing fancy, just produces an [API gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

```ts
import { Api } from "sst/constructs";

new Api(stack, "Api", {
  routes: {
    "GET    /notes": "src/list.main",
    "POST   /notes": "src/create.main",
    "GET    /notes/{id}": "src/get.main",
    "PUT    /notes/{id}": "src/update.main",
    "DELETE /notes/{id}": "src/delete.main",
  },
});
```
[SST docs](https://docs.sst.dev/constructs/Api)

### AppSyncApi

Similar to the Api definition, however here we instead produce a [graphql](https://graphql.org/learn/) API via [AppSync](https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html).

```ts
import { AppSyncApi } from "sst/constructs";

new AppSyncApi(stack, "GraphqlApi", {
  schema: "graphql/schema.graphql",
  dataSources: {
    notesDS: "src/notes.main",
  },
  resolvers: {
    "Query    listNotes": "notesDS",
    "Query    getNoteById": "notesDS",
    "Mutation createNote": "notesDS",
    "Mutation updateNote": "notesDS",
    "Mutation deleteNote": "notesDS",
  },
});
```

[SST docs](https://docs.sst.dev/constructs/AppSyncApi)

### Queue

Creates a new [SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) and attaches a Lambda (consumer).

```ts
import { Queue } from "sst/constructs";

new Queue(stack, "Queue", {
  consumer: "src/queueConsumer.main",
});
```

[SST docs](https://docs.sst.dev/constructs/Queue)

### Frontend Apps / StaticSite

Creates a cloudfront distribution and a bucket that house your static files. In general, build the frontend app and point the path to the dist folder.

```ts
new StaticSite(stack, "Site", {
  path: "path/to/site",
  customDomain: "my-app.com",
});
```

[SST docs](https://docs.sst.dev/constructs/Queue)

### Static Storage

```ts
import { Bucket } from "sst/constructs";

new Bucket(stack, "Bucket");
```

[SST docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
