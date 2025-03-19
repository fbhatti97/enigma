import Counter from '@/components/Counter';
import Link from 'next/link';

export default function ClientComponentPage() {
  return (
    <main>
      <h1>Client Component Example</h1>
      <p>This page includes a client component with state.</p>
      
      <Counter />
      
      <p>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}