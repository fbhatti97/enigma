// src/amplify-config.ts
import { Amplify } from 'aws-amplify';

export function configureAmplify() {
  const config = {
    Auth: {
      mandatorySignIn: false,
      region: 'ap-southeast-2',
    },
    ssr: true, // Enable SSR support
    API: {
      // For API Gateway or AppSync
      endpoints: [
        {
          name: 'api',
          endpoint: process.env.API_ENDPOINT,
          region: 'ap-southeast-2',
          custom_header: async () => {
            return { Authorization: 'token' }; // Replace with your auth logic if needed
          }
        }
      ]
    },
    Storage: {
      AWSS3: {
        bucket: process.env.S3_BUCKET,
        region: 'ap-southeast-2',
      }
    },
    // Role configuration for server-side operations
    SSR: {
      roleArn: 'arn:aws:iam::506012636122:role/NextJsSSRComputeRole',
      // Optional parameter to specify which services should use this role
      services: ['API', 'Storage', 'Auth']
    }
  } as Record<string, unknown>;

  Amplify.configure(config);
  return config;
}