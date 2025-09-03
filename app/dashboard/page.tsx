"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FoodItem } from '../types';
import { useAuth } from '../context/AuthContext';


const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
    setFoodItems(storedItems);
  }, []);

  const handleDelete = (id: number) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
  };

  const handleEdit = (id: number) => {
    router.push(`/updatefood?id=${id}`);
  };

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    // 1. พื้นหลังสีสันสดใส: ใช้ gradient และให้ความสูงเต็มหน้าจอ
    <div className="bg-gradient-to-br from-teal-100 via-blue-200 to-purple-200 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ส่วน Header: Search Bar และ ปุ่ม Add Food */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">My Food Diary</h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* 5. Search bar ด้านบน พร้อมปุ่มค้นหา */}
            <div className="flex w-full sm:w-auto">
              <input
                type="text"
                placeholder="ค้นหาชื่ออาหาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                ค้นหา
              </button>
            </div>

            {/* 4. ปุ่ม Add Food ลิงค์ไปหน้า /addfood */}
            <Link
              href="/addfood"
              className="w-full sm:w-auto bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-center"
            >
              + Add Food
            </Link>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full sm:w-auto bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-center"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 2. ตารางแสดงข้อมูลอาหาร */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">วันที่</th>
                  <th className="p-4 text-left font-semibold text-gray-600">รูปอาหาร</th>
                  <th className="p-4 text-left font-semibold text-gray-600">ชื่ออาหาร</th>
                  <th className="p-4 text-left font-semibold text-gray-600">มื้ออาหาร</th>
                  <th className="p-4 text-center font-semibold text-gray-600">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((food) => (
                  <tr key={food.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-gray-700 whitespace-nowrap">{food.date}</td>
                    <td className="p-4">
                      <Image src={food.imageUrl} alt={food.name} width={64} height={64} className="object-cover rounded-md" />
                    </td>
                    <td className="p-4 font-medium text-gray-900">{food.name}</td>
                    <td className="p-4 text-gray-700">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        food.mealType === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                        food.mealType === 'Lunch' ? 'bg-green-100 text-green-800' :
                        food.mealType === 'Dinner' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {food.mealType}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* 3. ปุ่มแก้ไขและลบในแต่ละรายการ */}
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEdit(food.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(food.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200">&laquo;</button>
            <button className="px-3 py-1 rounded-md bg-blue-500 text-white">1</button>
            <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">2</button>
            <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">3</button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">10</button>
            <button className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200">&raquo;</button>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
