'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin-login.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('admin-auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
     <div className="admin-login-container">
      <h1>⚙️ Admin Login</h1>
      <input
        className="admin-login-input"
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="admin-login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="admin-login-error">{error}</p>}
    </div>
  );
}
