'use client';

import './user-login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'user123') {
      localStorage.setItem('user-auth', 'true');  
      console.log('✅ Login successful. Auth saved.');
      router.replace('/blog');  
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="user-login-container">
      <h1>🔐 User Login</h1>
      <input
        className="user-login-input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="user-login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="user-login-error">{error}</p>}
    </div>
  );
}
