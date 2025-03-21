import { Amplify } from 'aws-amplify';

export function configureAmplify() {
  const config = {
    ssr: true,
    SSR: {
      roleArn: 'arn:aws:iam::506012636122:role/NextJsSSRComputeRole',
      services: []
    }
  } as Record<string, unknown>;

  Amplify.configure(config);
  return config;
}