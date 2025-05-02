'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [accountName, setAccountName] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userData = {
      email: email,
      account_name: accountName,
      name: name,
      surname: surname,
      role: role,
      password: password,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('User registered successfully');
        router.push('/'); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Your username"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Doe"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Register
      </button>
    </form>
  );
}
