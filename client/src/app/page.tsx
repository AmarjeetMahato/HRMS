"use client"
import React from 'react';
import { ArrowRight, Users, Calendar, FileText, TrendingUp, Shield, Clock } from 'lucide-react';

export default function Home() {
  const handleRedirect = () => {
    window.location.href = '/dashboard/employee'; // or your HRMS route
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
     

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-600 font-semibold text-sm">Human Resource Management System</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Workforce
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Effortlessly
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline HR processes, manage employees, track attendance, and boost productivity with our comprehensive HRMS solution.
          </p>
          
          {/* Main CTA Button */}
          <button
            onClick={handleRedirect}
            className="group relative cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center gap-3">
              Access HRMS Dashboard
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600 mt-1">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600 mt-1">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600 mt-1">Uptime</div>
            </div>
          </div>
        </div>

 
   
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 HRMS Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}