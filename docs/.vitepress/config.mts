import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Elva Onboarding',
  base: '/serverless-onboarding/',
  description: 'elva-onboarding-wip',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [
      { text: 'Outline', link: '/outline' },
      {
        text: '1. Introduction to AWS',
        items: [
          {
            text: 'Cloud Computing',
            link: '/level-1/cloud-computing',
          },
          {
            text: 'Use Case',
            link: '/level-1/use-case',
          },
          {
            text: 'Prerequisites',
            link: '/level-1/prerequisites',
          },
          {
            text: 'Your account',
            link: '/level-1/account',
          },
        ],
      },
      {
        text: '2. Serverless Computing Concepts',
        items: [
          {
            text: 'Your First lambda',
            link: '/level-2/hello-world-lambda',
          },
          {
            text: 'Your First API',
            link: '/level-2/your-first-api',
          },
        ],
      },
      {
        text: '3. Serverless Development and Deployment',
        items: [
          {
            text: 'Framewors',
            link: '/level-3/frameworks',
          },
          {
            text: 'SST',
            link: '/level-3/sst',
          },
          {
            text: 'Creating & Running a Project',
            link: '/level-3/project',
          },
        ],
      },
      {
        text: '4. Serverless Data Storage and Databases',
        items: [
          {
            text: 'S3',
            link: '/level-4/s3',
          },
          {
            text: 'DynamoDB',
            link: '/level-4/dynamo',
          },
          {
            text: 'Building an Image Service',
            link: '/level-4/image-service',
          },
        ],
      },
      {
        text: '5. Advanced Serverless Topics',
        items: [
          {
            text: 'Event-Driven Architectures',
            link: '',
          },
          {
            text: 'State Machines',
            link: '',
          },
          {
            text: 'Building an Image Service',
            link: '/level-5/image-service',
          },
          {
            text: 'Authentication and Authorization',
            link: '',
          },
          {
            text: 'Secure you APIs',
            link: '/level-5/image-service',
          },
          {
            text: 'Monitoring & Debugging',
            link: '',
          },
        ],
      },
      {
        text: '8. Serverless Optimization and Best Practices',
        link: '/module-3',
        items: [
          {
            text: 'CI/CD',
            link: '',
          },
          {
            text: 'Cost Optimization',
            link: '',
          },
          {
            text: 'Serverless Security',
            link: '',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/elva-labs/serverless-onboarding',
      },
    ],
  },
});
