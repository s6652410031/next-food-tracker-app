// app/login/page.tsx

"use client"; // This component requires client-side interactivity (state, event handlers).

import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

/**
 * LoginPage Component
 * A secure and stylish login form. It uses client-side state management for form inputs
 * and is styled with Tailwind CSS to match the application's theme.
 */
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  // State to hold the user's login credentials.
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // A single handler to update state for any input field change.
  // The event is typed with TypeScript's ChangeEvent for type safety.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles the form submission.
  // The event is typed with FormEvent to ensure correctness.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login(credentials.email, credentials.password)) {
      router.push('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    // Main container with the consistent vibrant gradient background.
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 p-6">
      
      {/* Form card with the same glassmorphism effect for a cohesive look. */}
      <div className="w-full max-w-md rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Login
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-200">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full transform rounded-full bg-blue-600 px-10 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            Login
          </button>
        </form>
        
        {/* Link to Register Page */}
        <p className="mt-8 text-center text-gray-200">
          Dont have an account?{' '}
          <Link href="/register" className="font-semibold text-white underline hover:text-gray-100">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}