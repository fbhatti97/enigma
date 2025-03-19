import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      <p>This is a static page that doesn't require any data fetching.</p>
      <p>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}