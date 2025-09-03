"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FoodItem } from '../types';

export default function UpdateFoodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    date: '',
    name: '',
    mealType: 'Breakfast' as FoodItem['mealType'],
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
      const item = foodItems.find((item: FoodItem) => item.id === parseInt(id));
      if (item) {
        setFormData({
          date: item.date,
          name: item.name,
          mealType: item.mealType,
          imageUrl: item.imageUrl,
        });
        setImagePreview(item.imageUrl);
      }
    }
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prevState => ({ ...prevState, imageUrl: url }));
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
    const updatedItems = foodItems.map((item: FoodItem) =>
      item.id === parseInt(id)
        ? { ...item, ...formData }
        : item
    );
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Update Food</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="flex justify-center">
            <label htmlFor="image" className="group relative h-32 w-32 cursor-pointer rounded-full border-2 border-dashed border-gray-300 transition hover:border-white">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Food preview"
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
              <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* Meal Type */}
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-white/30 bg-cyan-800/50 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full transform rounded-full bg-white px-10 py-3 font-semibold text-cyan-600 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            Update Food
          </button>
        </form>

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
