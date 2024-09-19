# Lambda Detail

AWS Lambda is a serverless computing service provided by Amazon Web Services (AWS) that allows you to run code in response to events and automatically manage the computing resources required for your code to run. It abstracts the infrastructure management and lets you focus on writing your code. Here's how AWS Lambda works under the hood:

Event Sources: AWS Lambda is event-driven. It can be triggered by various AWS services or custom events. Some common event sources include Amazon S3 (object creation, deletion), Amazon SNS (notifications), Amazon API Gateway (HTTP requests), AWS CloudWatch (logs, events), and more. You can also set up custom events using the AWS SDK or CLI.

Packaging and Deployment: You package your code and its dependencies into a deployment package, typically as a ZIP file, and upload it to AWS Lambda. This code can be written in various programming languages, including Python, Node.js, Java, C#, and more.

Function Configuration: You configure your Lambda function, specifying runtime environment (e.g., Node.js, Python), memory allocation, execution timeout, and other settings. AWS Lambda provisions the necessary infrastructure to run your function.

Execution Environment: AWS Lambda manages a pool of execution environments to handle incoming events. When an event is triggered, AWS Lambda selects an available execution environment to run the function. If an environment is not available, it will create a new one, including the necessary runtime and dependencies.

Code Execution: Once an execution environment is ready, AWS Lambda deploys your code within it and runs the function. It sets up any required resources like temporary storage and network connections. Your code starts executing, processing the event, and generating results.

Scaling: AWS Lambda automatically scales the number of execution environments based on the number of incoming events. If a large number of events arrive simultaneously, it will create additional execution environments to handle the load. This auto-scaling behavior allows Lambda to handle variable workloads.

Monitoring and Logging: AWS Lambda provides CloudWatch metrics and logs to help you monitor and troubleshoot your functions. You can view metrics on invocation counts, errors, duration, and more. Logs provide detailed information about the execution of your code.

Billing: You are billed based on the number of requests, execution time, and memory used by your functions. You don't need to pay for idle resources, making it a cost-effective option for many workloads.

Statelessness: Lambda functions are designed to be stateless. Any state that needs to be maintained between invocations must be stored externally, such as in Amazon S3, DynamoDB, or other AWS services.

Results and Response: After your Lambda function completes its execution, it can return results to the event source or store data in other AWS services. For example, it can write data to a database, send a notification, or generate files in S3.

AWS Lambda abstracts most of the underlying infrastructure management, making it easier for developers to focus on building scalable and event-driven applications without worrying about server provisioning, scaling, or maintenance.


* https://aws.amazon.com/blogs/compute/aws-lambda-resilience-under-the-hood/#:~:text=AWS%20Lambda%20comprises%20over%2080,Lambda%20is%20a%20Regional%20service.
* https://www.youtube.com/watch?v=xmacMfbrG28
* https://firecracker-microvm.github.io/
