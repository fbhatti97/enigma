import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic'; // Disable static optimization for this page

export default async function SSRTestPage() {
  try {
    // Get the Prisma client
    const client = await prisma.client;

    // Fetch users from the database to test the connection
    const users = await client.user.findMany();
    const timestamp = new Date().toISOString();

    return (
      <div>
        <h1>Server-Side Rendering Test</h1>
        <p>SSR is working correctly!</p>
        <p>Page rendered at: {timestamp}</p>
        <div>
          <h2>Database Connection Status:</h2>
          <p>Successfully connected to the database via RDS Proxy.</p>
          <h3>Users in Database:</h3>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found in the database.</p>
          )}
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