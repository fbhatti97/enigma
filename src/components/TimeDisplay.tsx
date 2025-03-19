'use client';

import { useState, useEffect } from 'react';

export default function TimeDisplay() {
  const [time, setTime] = useState<string>('Loading...');
  
  useEffect(() => {
    // Update the time when the component mounts (client-side only)
    setTime(new Date().toLocaleTimeString());
    
    // Optionally, update the time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <span>{time}</span>;
}