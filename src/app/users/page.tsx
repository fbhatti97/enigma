'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      if (response.ok) {
        setName('');
        setEmail('');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return (
    <main>
      <h1>Users</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Add User
          </button>
        </form>
      </div>
      
      <div>
        <h2>User List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id} style={{ marginBottom: '0.5rem' }}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>
      
      <p style={{ marginTop: '2rem' }}>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}