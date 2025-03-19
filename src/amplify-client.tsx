// src/amplify-client.tsx
'use client';

import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplifyconfiguration';
import { useEffect } from 'react';

export default function AmplifyClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Amplify.configure(amplifyConfig);
  }, []);

  return <>{children}</>;
}