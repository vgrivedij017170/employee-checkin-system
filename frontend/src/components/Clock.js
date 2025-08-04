import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;