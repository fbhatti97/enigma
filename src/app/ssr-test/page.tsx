// src/app/ssr-test/page.tsx
import { serverRunner } from '@/amplify-server';

export const dynamic = 'force-dynamic'; // Disable static optimization for this page

export default async function SSRTestPage() {
  try {
    // Initialize server-side AWS resources
    const serverData = await serverRunner();
    const timestamp = new Date().toISOString();

    return (
      <div>
        <h1>Server-Side Rendering Test</h1>
        <p>SSR is working correctly!</p>
        <p>Page rendered at: {timestamp}</p>
        <div>
          <h2>Server Configuration Status:</h2>
          <pre>{JSON.stringify(serverData, null, 2)}</pre>
        </div>
      </div>
    );
  } catch (error) {
    // Handle any errors during server-side rendering
    return (
      <div>
        <h1>Server-Side Rendering Error</h1>
        <p>Something went wrong during SSR:</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}