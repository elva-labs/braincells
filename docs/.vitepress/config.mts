import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Braincells",
  base: "/braincells/",
  description: "Learn AWS Serverless with resources by the experts at Elva.",
  head: [
    ["link", { rel: "stylesheet", href: "./custom.css" }],
    ["link", { rel: "icon", href: "./favicon.ico" }],
  ],
  themeConfig: {
    logo: "./assets/elva-logo-outline.png",
    nav: [
      {
        text: "Serverless on AWS",
        link: "/serverless-aws/outline",
      },
      {
        text: "Containerization",
        link: "/containers/outline",
      },
      {
        text: "Serverless Challenges",
        link: "/serverless-challenges/outline",
      },
    ],
    sidebar: {
      "/serverless-aws/": [
        { text: "Outline", link: "/serverless-aws/outline" },
        {
          text: "1. Introduction to AWS",
          items: [
            {
              text: "Cloud Computing",
              link: "/serverless-aws/level-1/cloud-computing",
            },
            {
              text: "Use Case",
              link: "/serverless-aws/level-1/use-case",
            },
            {
              text: "Prerequisites",
              link: "/serverless-aws/level-1/prerequisites",
            },
            {
              text: "Your account",
              link: "/serverless-aws/level-1/account",
            },
          ],
        },
        {
          text: "2. Serverless Computing Concepts",
          items: [
            {
              text: "Your First Lambda",
              link: "/serverless-aws/level-2/hello-world-lambda",
            },
            {
              text: "Your First API",
              link: "/serverless-aws/level-2/your-first-api",
            },
          ],
        },
        {
          text: "3. Serverless Development and Deployment",
          items: [
            {
              text: "Frameworks",
              link: "/serverless-aws/level-3/frameworks",
            },
            {
              text: "SST",
              link: "/serverless-aws/level-3/sst",
            },
            {
              text: "Creating & Running a Project",
              link: "/serverless-aws/level-3/project",
            },
          ],
        },
        {
          text: "4. Serverless Data Storage and Databases",
          items: [
            {
              text: "S3",
              link: "/serverless-aws/level-4/s3",
            },
            {
              text: "DynamoDB",
              link: "/serverless-aws/level-4/dynamo",
            },
            {
              text: "Building an Image Service",
              link: "/serverless-aws/level-4/image-service",
            },
          ],
        },
        {
          text: "5. Advanced Serverless Topics",
          items: [
            {
              text: "Event-Driven Architectures",
              link: "/serverless-aws/level-5/eda-serverless",
            },
            {
              text: "State Machines",
              link: "/serverless-aws/level-5/statemachines",
            },
            {
              text: "Building a Weather Report Service",
              link: "/serverless-aws/level-5/weather-report",
            },
            {
              text: "Authentication and Authorization (TODO)",
              link: "",
            },
            {
              text: "Secure you APIs (TODO)",
              link: "/serverless-aws/level-5/image-service",
            },
            {
              text: "Monitoring & Debugging (TODO)",
              link: "",
            },
          ],
        },
        {
          text: "8. Serverless Optimization and Best Practices (TODO)",
          link: "",
          items: [
            {
              text: "CI/CD",
              link: "",
            },
            {
              text: "Cost Optimization",
              link: "",
            },
            {
              text: "Serverless Security",
              link: "",
            },
          ],
        },
      ],

      "/containers/": [{ text: "Outline", link: "/containers/outline" }],

      "/serverless-challenges/": [
        { text: "Outline", link: "/serverless-challenges/outline" },

        {
          text: "Event Driven Architectures",
          link: "/serverless-challenges/event-driven",
          items: [
            {
              text: "Storage First",
              link: "/serverless-challenges/event-driven/storage-first-pattern"
            },
            {
              text: "Claim Check Pattern",
              link: "/serverless-challenges/event-driven/claim-check-pattern"
            },
            {
              text: "Cross Account Events",
              link: "/serverless-challenges/event-driven/cross-account-events"
            }
          ]
        },

        // Harder, should probably be renamed
        {
          text: "Data Persistance and Storage",
          link: "/serverless-challenges/data-persistance-and-storage",
          items: [
            {
              text: "Store and serve large media files",
              link: "/serverless-challenges/data-persistance-and-storage/store-and-serve-large-media-files",
            },
            {
              text: "Data Persistence Patterns with DynamoDB",
              link: "/serverless-challenges/data-persistance-and-storage/data-persistance-patterns-with-dynamodb",
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/elva-labs/braincells",
      },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/company/elva-group/",
      },
      {
        icon: "twitter",
        link: "https://x.com/elva_group",
      },
    ],
  },
});
