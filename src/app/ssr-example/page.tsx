import Link from 'next/link';

// This function runs on the server for every request
async function getData() {
  // Add artificial delay to demonstrate SSR
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    serverTime: new Date().toISOString(),
    message: "This data was generated on the server"
  };
}

export default async function SSRExamplePage() {
  // This entire component runs on the server
  const data = await getData();
  
  return (
    <main>
      <h1>Server-Side Rendering Example</h1>
      <p>This page demonstrates server-side rendering with the App Router.</p>
      <div>
        <p>Server time when this page was rendered: {data.serverTime}</p>
        <p>Message from server: {data.message}</p>
      </div>
      <p>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}