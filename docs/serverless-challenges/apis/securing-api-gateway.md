<script setup>
import Quiz from "../../../components/Quiz.vue"
</script>

# Securing an API Gateway

### Challenge Level: 3

In this challenge, you'll implement various security measures to protect an API Gateway. This is crucial for ensuring that your serverless APIs are secure, preventing unauthorized access, and protecting sensitive data.

## Challenge Description

Your task is to design and implement a comprehensive security solution for an API Gateway. This includes authentication, authorization, encryption, and proper request/response handling to safeguard your API against common threats.

## Technical Requirements

1. Set up an Amazon API Gateway with at least three endpoints (GET, POST, DELETE)
2. Implement AWS Cognito for user authentication
3. Use IAM roles for fine-grained authorization
4. Enable HTTPS encryption for all API endpoints
5. Implement request validation and sanitization
6. Set up proper CORS (Cross-Origin Resource Sharing) configuration
7. Implement rate limiting to prevent DDoS attacks
8. Use AWS WAF (Web Application Firewall) to protect against common web exploits
9. Enable CloudWatch Logs for API Gateway and set up alarms for suspicious activity
10. Implement proper error handling without leaking sensitive information

## Architecture

<!-- ![Architecture Diagram](./securing-api-gateway.png) -->

## Hints

::: details Hint 1: Authentication with Cognito
When using AWS Cognito for authentication:
- Set up a Cognito User Pool to manage user accounts
- Configure the API Gateway to use a Cognito Authorizer
- Implement token-based authentication in your client applications
:::

::: details Hint 2: Fine-grained Authorization with IAM
To implement fine-grained authorization:
- Create IAM roles with specific permissions for different API actions
- Use API Gateway resource policies to control access to your API
- Implement custom authorizers if you need more complex authorization logic
:::

::: details Hint 3: Encryption and HTTPS
Ensure all communication is encrypted:
- Use AWS Certificate Manager to provision and manage SSL/TLS certificates
- Configure your API Gateway to use these certificates
- Enforce HTTPS-only communication by redirecting HTTP requests to HTTPS
:::

::: details Hint 4: Request Validation and Rate Limiting
Protect your API from malformed requests and overuse:
- Use API Gateway request validators to ensure incoming requests meet your schema
- Implement request throttling at the API Gateway level
- Use usage plans and API keys to manage and monitor API usage
:::

## Resources

- [API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [AWS Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
- [AWS WAF Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)
- [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

## Quiz

<Quiz 
  question="What is the primary purpose of using AWS Cognito with API Gateway?"
  :answers="['To increase API performance', 'To provide user authentication', 'To implement rate limiting', 'To enable HTTPS encryption']"
  :correctAnswer="1"
  :answerInfo="[
    'While Cognito can help manage user pools efficiently, increasing API performance is not its primary purpose.',
    'Correct! AWS Cognito is primarily used with API Gateway to provide user authentication, managing user sign-up, sign-in, and access control.',
    'Rate limiting is typically handled by API Gateway itself, not Cognito.',
    'HTTPS encryption is handled by API Gateway and Certificate Manager, not Cognito.'
    ]"
/>

<Quiz 
  question="Which AWS service is commonly used to protect APIs against common web exploits?"
  :answers="['AWS Shield', 'AWS Firewall Manager', 'AWS WAF', 'AWS GuardDuty']"
  :correctAnswer="2"
  :answerInfo="[
    'AWS Shield is primarily for DDoS protection, not for protecting against common web exploits.',
    'Firewall Manager is for managing firewall rules across accounts and applications, not specifically for API protection.',
    'Correct! AWS WAF (Web Application Firewall) is commonly used to protect APIs against common web exploits like SQL injection and cross-site scripting.',
    'GuardDuty is for threat detection across your AWS accounts and workloads, not specifically for API protection.'
    ]"
/>

<Quiz 
  question="What is the purpose of implementing CORS in API Gateway?"
  :answers="['To increase API performance', 'To provide authentication', 'To allow or restrict cross-origin requests', 'To implement encryption']"
  :correctAnswer="2"
  :answerInfo="[
  'CORS is not related to API performance.',
  'CORS is not an authentication mechanism.',
  'Correct! CORS (Cross-Origin Resource Sharing) is implemented to control which domains can make requests to your API, allowing or restricting cross-origin requests.',
  'CORS is not related to encryption; it\'s about access control.'
  ]"
/>

<Quiz 
  question="Which of the following is NOT a recommended practice for securing an API Gateway?"
  :answers="['Using HTTPS for all communications', 'Implementing rate limiting', 'Storing sensitive data in API responses', 'Using AWS WAF for protection against web exploits']"
  :correctAnswer="2"
  :answerInfo="[
  'Using HTTPS for all communications is indeed a recommended practice for API security.',
  'Implementing rate limiting is a good practice to prevent abuse and DDoS attacks.',
  'Correct! Storing sensitive data in API responses is NOT a recommended practice. Sensitive data should be properly protected and only shared when necessary.',
  'Using AWS WAF is a recommended practice for protecting APIs against common web exploits.'
  ]"
/>

## Additional Reading

* AWS has a comprehensive guide on [Controlling and Managing Access to a REST API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)
