// app/register/page.tsx

"use client"; // This directive is essential for components with state and event handlers.
import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

/**
 * RegisterPage Component
 * A complete user registration form with client-side validation and image preview functionality.
 * Styled with Tailwind CSS for a responsive and modern user interface.
 */
export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  // State for storing all form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    profileImage: null as File | null,
  });

  // State specifically for the URL of the image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handles changes for all text-based inputs and the select dropdown
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handles the file input change for the profile image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prevState => ({ ...prevState, profileImage: file }));
      // Create a temporary URL for the selected image to show a preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handles form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      profileImage: formData.profileImage ? URL.createObjectURL(formData.profileImage) : undefined,
    };
    if (register(userData)) {
      router.push('/dashboard');
    } else {
      alert('Email already exists');
    }
  };

  return (
    // Main container with the same consistent gradient background
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload & Preview Section */}
          <div className="flex justify-center">
            <label htmlFor="profileImage" className="group relative h-32 w-32 cursor-pointer rounded-full border-2 border-dashed border-gray-300 transition hover:border-white">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-sm">Upload Photo</span>
                </div>
              )}
               <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
            </label>
          </div>

          {/* Name Inputs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} required className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} required className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
          </div>

          {/* Email & Password */}
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white" />

          {/* Gender Selection */}
          <select name="gender" onChange={handleInputChange} required className="w-full rounded-md border border-white/30 bg-cyan-800/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white">
            <option defaultValue="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          {/* Submit Button */}
          <button type="submit" className="w-full transform rounded-full bg-white px-10 py-3 font-semibold text-cyan-600 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50">
            Register
          </button>
        </form>
        
        {/* Link to Login Page */}
        <p className="mt-6 text-center text-gray-200">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-white underline hover:text-gray-100">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}