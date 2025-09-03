"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: user?.gender || '',
    profileImage: user?.profileImage || null as string | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(user?.profileImage || null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prevState => ({ ...prevState, profileImage: url }));
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    // In a real app, update user in backend
    // For now, just update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: typeof user) =>
      u?.id === user.id ? { ...u, ...formData } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...user, ...formData }));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Profile</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm">Upload Photo</span>
                  </div>
                )}
                <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {/* Name Inputs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-white/30 bg-cyan-800/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full transform rounded-full bg-white px-10 py-3 font-semibold text-cyan-600 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full transform rounded-full bg-gray-500 px-10 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex justify-center">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-gray-600">{user.firstName[0]}</span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center text-white">
              <h3 className="text-xl font-bold">{user.firstName} {user.lastName}</h3>
              <p className="text-gray-200">{user.email}</p>
              <p className="text-gray-200 capitalize">{user.gender}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full transform rounded-full bg-white px-10 py-3 font-semibold text-cyan-600 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Back to Dashboard */}
        <p className="mt-6 text-center text-gray-200">
          <Link href="/dashboard" className="font-semibold text-white underline hover:text-gray-100">
            Back to Dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
