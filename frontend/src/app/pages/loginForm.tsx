'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);  // Track client-side rendering
  const router = useRouter();

  // Ensure the code only runs client-side
  useEffect(() => {
    setIsClient(true);  // Set to true once the component is mounted on the client
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        router.push('/home'); // Redirect on success
      }
    } catch (err: any) {
      console.error('Login failed:', err.response || err.message);

      // Display error message based on response
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  // Ensure the component is only rendered on the client-side
  if (!isClient) return null;

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
      <Link href="/register">Register</Link>
      <Link href="/authenticate">authenticate</Link>
      {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
    </form>
  );
}
