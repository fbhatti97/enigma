// src/amplify-server.ts
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import { configureAmplify } from './amplify-config';

export async function serverRunner() {
  // Configure Amplify
  const config = configureAmplify();
  
  try {
    // Create server runner with nextjs adapter
    const { runWithAmplifyServerContext } = createServerRunner({
      config
    });

    // Run operations in the server context
    const result = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async () => {
        // Here we can perform authenticated operations using the compute role
        // For example, fetch data from AWS services using the role credentials
        
        // Return information about the role being used
        return {
          success: true,
          roleArn: 'arn:aws:iam::506012636122:role/NextJsSSRComputeRole',
          roleType: 'compute role',
          capabilities: [
            'Read data from authenticated AWS services',
            'Execute server-side operations',
            'Interact with AWS resources on behalf of the application'
          ]
        };
      }
    });
    
    return {
      initialized: true,
      result,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in server context:', error);
    return {
      initialized: false,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
  }
}