import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/serverless-onboarding/",
  description: "elva-onboarding-wip",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      { text: "Outline", link: "/outline" },
      {
        text: "1. Introduction to AWS",
        link: "/module-1",
        items: [
          {
            text: 'Cloud Computing',
            link: '/module-1/cloud-computing',
          },
          {
            text: 'Use Case',
            link: '/module-1/use-case',
          },
          {
            text: 'Your account',
            link: '/module-1/account',
          },
        ]
      },
      {
        text: "2. Serverless Computing Concepts",
        link: "/module-2",
        items: [
          {
            text: "AWS Lambda",
            link: "",
          },
          {
            text: "API Gateway",
            link: "",
          },
        ],
      },
      {
        text: "3. Serverless Development and Deployment",
        link: "/module-3",
        items: [
          {
            text: "Framewors",
            link: "",
          },
          {
            text: "CDK",
            link: "",
          },
          {
            text: "SST",
            link: "",
          },
          {
            text: "Serverless*",
            link: "",
          },
          {
            text: "CI/CD",
            link: "",
          },
        ],
      },
      {
        text: "4. Serverless Data Storage and Databases",
        link: "/module-3",
        items: [
          {
            text: "S3",
            link: "",
          },
          {
            text: "DynamoDB",
            link: "",
          },
          {
            text: "RDS*",
            link: "",
          },
        ],
      },
      {
        text: "5. Advanced Serverless Topics",
        link: "/module-3",
        items: [
          {
            text: "Event-Driven Architectures",
            link: "",
          },
          {
            text: "State Machines",
            link: "",
          },
          {
            text: "Authentication and Authorization",
            link: "",
          },
          {
            text: "Monitoring & Debugging",
            link: "",
          },
        ],
      },
      {
        text: "8. Serverless Optimization and Best Practices",
        link: "/module-3",
        items: [
          {
            text: "Cost Optimization",
            link: "test",
          },
          {
            text: "Serverless Security",
            link: "test",
          },
        ],
      }
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/elva-labs/serverless-onboarding",
      },
    ],
  },
});
