import Link from 'next/link';
import TimeDisplay from '@/components/TimeDisplay';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js with App Router</h1>
      <p>This is the home page of your Next.js application.</p>
      <p>Current time: <TimeDisplay /></p>
      
      <nav style={{ margin: '2rem 0' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/about">Go to About Page</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/ssr-example">Go to SSR Example Page</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/api-example">Go to API Example Page</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/client-component-example">Go to Client Component Example</Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/users">Go to Users Page</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}