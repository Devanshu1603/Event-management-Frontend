import React from 'react';
import { Calendar, Bell, Users } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8" />
            <h1 className="text-2xl font-bold">EventFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-indigo-500 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-indigo-500 rounded-full">
              <Users className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}