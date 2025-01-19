import React from 'react';
import { Link } from 'react-router-dom';  

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg "
          >
            Register
          </button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to='/login' className="text-blue-800 hover:underline">Login</Link>

          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
