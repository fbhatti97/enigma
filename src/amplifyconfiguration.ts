// src/amplifyconfiguration.ts
const amplifyConfig = {
    Auth: {
      Cognito: {
        region: 'ap-southeast-2', // Your AWS region
        userPoolId: 'YOUR_USER_POOL_ID', // If you're using Cognito
        userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID', // If you're using Cognito
      }
    },
    // Add other service configurations as needed
  };
  
  export default amplifyConfig;