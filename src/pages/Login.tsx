import React, { useState } from 'react';
import { LockIcon, UserIcon, ArrowRightIcon } from 'lucide-react';
interface LoginProps {
  onLogin: () => void;
  correctPassword: string;
}
export function Login({ onLogin, correctPassword }: LoginProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === 'Billy' && password === correctPassword) {
      setError('');
      onLogin();
    } else {
      setError('Invalid User ID or Password');
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-[#0C2340] p-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            SAMUDRA SEAFOOD
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Price List Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            Sign In
          </h2>

          {error &&
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
              {error}
            </div>
          }

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter User ID"
                  required />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter Password"
                  required />
                
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md transition-colors font-medium">
            
            Sign In <ArrowRightIcon className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>);

}