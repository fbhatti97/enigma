'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ApiData {
  message: string;
  timestamp: number;
}

export default function ApiExamplePage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/hello');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Error fetching API data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <main>
      <h1>API Example Page</h1>
      <p>This page fetches data from an API route on the client side.</p>
      
      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <div>
          <p>Message from API: {data.message}</p>
          <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Error loading data</p>
      )}
      
      <p>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}