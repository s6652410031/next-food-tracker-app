// app/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * HomePage Component
 * * This is the main landing page for the Food Tracker application.
 * It features a modern, welcoming design with clear calls to action.
 * Styled with Tailwind CSS for a responsive and clean user interface.
 */
export default function HomePage() {
  return (
    // Main container: Uses a full-screen height and a vibrant gradient background.
    // Flexbox is used to perfectly center the content both vertically and horizontally.
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 p-6">
      
      {/* Content card with a subtle glassmorphism effect for a modern look */}
      <div className="w-full max-w-md rounded-2xl bg-white/20 p-8 text-center shadow-2xl backdrop-blur-lg">
        
        {/* App Image: Optimized using the Next.js Image component. */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/foodtracker.jpg" // IMPORTANT: Place your image in the `public` folder.
            alt="foodtracker"
            width={140}
            height={140}
            priority // Prioritizes loading this image as it's above the fold.
            className="drop-shadow-lg"
          />
        </div>

        {/* Main Heading: Large, bold text with a subtle shadow to stand out. */}
        <h1 className="text-5xl font-extrabold tracking-tight text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_20%)]">
          Welcome to Food Tracker
        </h1>

        {/* Subheading: Provides a clear and concise mission statement. */}
        <p className="mt-3 text-xl text-gray-100 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
          Track your meal!!!
        </p>

        {/* Action Buttons Container: Uses Flexbox for responsive button layout. */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          
          {/* Register Button: Uses Next.js Link for fast, client-side navigation. */}
          <Link href="/register" passHref>
            <button 
              className="transform rounded-full bg-white px-10 py-3 font-semibold text-cyan-600 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Register
            </button>
          </Link>
          
          {/* Login Button: Styled as a secondary action. */}
          <Link href="/login" passHref>
            <button 
              className="transform rounded-full bg-blue-600 px-10 py-3 font-semibold text-white shadow-lg ring-1 ring-blue-500/50 transition-transform duration-300 hover:-translate-y-1 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}