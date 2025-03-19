// app/components/AmplifyClient.tsx
'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';

export default function AmplifyClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Minimal configuration just to get the build passing
    Amplify.configure({});
  }, []);

  return <>{children}</>;
}