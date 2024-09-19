import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hjärnceller',
  base: '/serverless-onboarding/',
  description:
    'Training Center for Elva. Topics like Serverless, AWS, and more.',
  head: [['link', { rel: 'stylesheet', href: './custom.css' }]],
  themeConfig: {
    logo: './assets/elva-logo-transparent.png',
    nav: [
      {
        text: 'Onboarding',
        link: '/onboarding/outline',
      },
      {
        text: 'Courses',
        items: [
          { text: 'Containerization', link: '/containers/outline' },
          { text: 'Serverless Solutions', link: '/serverless-solutions/outline' }
        ],
      },
    ],
    sidebar: {
      '/onboarding/': [
        { text: 'Outline', link: '/onboarding/outline' },
        {
          text: '1. Introduction to AWS',
          items: [
            {
              text: 'Cloud Computing',
              link: '/onboarding/level-1/cloud-computing',
            },
            {
              text: 'Use Case',
              link: '/onboarding/level-1/use-case',
            },
            {
              text: 'Prerequisites',
              link: '/onboarding/level-1/prerequisites',
            },
            {
              text: 'Your account',
              link: '/onboarding/level-1/account',
            },
          ],
        },
        {
          text: '2. Serverless Computing Concepts',
          items: [
            {
              text: 'Your First Lambda',
              link: '/onboarding/level-2/hello-world-lambda',
            },
            {
              text: 'Your First API',
              link: '/onboarding/level-2/your-first-api',
            },
          ],
        },
        {
          text: '3. Serverless Development and Deployment',
          items: [
            {
              text: 'Frameworks',
              link: '/onboarding/level-3/frameworks',
            },
            {
              text: 'SST',
              link: '/onboarding/level-3/sst',
            },
            {
              text: 'Creating & Running a Project',
              link: '/onboarding/level-3/project',
            },
          ],
        },
        {
          text: '4. Serverless Data Storage and Databases',
          items: [
            {
              text: 'S3',
              link: '/onboarding/level-4/s3',
            },
            {
              text: 'DynamoDB',
              link: '/onboarding/level-4/dynamo',
            },
            {
              text: 'Building an Image Service',
              link: '/onboarding/level-4/image-service',
            },
          ],
        },
        {
          text: '5. Advanced Serverless Topics',
          items: [
            {
              text: 'Event-Driven Architectures',
              link: '/onboarding/level-5/eda-serverless',
            },
            {
              text: 'State Machines',
              link: '/onboarding/level-5/statemachines',
            },
            {
              text: 'Building a Weather Report Service',
              link: '/onboarding/level-5/weather-report',
            },
            {
              text: 'Authentication and Authorization (TODO)',
              link: '',
            },
            {
              text: 'Secure you APIs (TODO)',
              link: '/onboarding/level-5/image-service',
            },
            {
              text: 'Monitoring & Debugging (TODO)',
              link: '',
            },
          ],
        },
        {
          text: '8. Serverless Optimization and Best Practices (TODO)',
          link: '',
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

      '/containers/': [
        { text: 'Outline', link: '/containers/outline' }
      ],

      '/serverless-solutions/': [
        { text: 'Outline', link: '/serverless-solutions/outline' },
        {
          text: 'Data Persistance and Storage',
          link: '/serverless-solutions/data-persistance-and-storage',
          items: [
            {
              text: 'Use S3 to store and serve large media files uploaded by users',
              link: '/serverless-solutions/data-persistance-and-storage/store-and-serve-large-media-files',
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/elva-labs/serverless-onboarding',
      },
    ],
  },
});
