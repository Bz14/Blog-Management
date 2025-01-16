import React from 'react';
import { Link } from 'react-router-dom';  
import landingImage from '/assets/landingImage.jpg';

const Landing = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <nav className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-800 text-white py-4 px-6 flex justify-between items-center z-10">
        <div className="text-2xl font-bold">WriteWay</div>
        <ul className="flex space-x-6">
          <li className="hover:text-gray-400"><a href="#about">About Us</a></li>
          <li className="hover:text-gray-400"><a href="#story">Story</a></li>
          <li className="hover:text-gray-400">
            <Link to="/login">Sign In</Link> {/* Use Link here */}
          </li>
          <li>
            <Link to="/register" className="bg-black text-white px-4 py-2 rounded-lg">
              Get Started
            </Link> {/* Use Link here */}
          </li>
        </ul>
      </nav>

      <div className="flex flex-col items-start justify-center h-full text-left px-6">
        <h1 className="text-7xl font-extrabold mb-4">Write, Share, Inspire</h1>
        <p className="text-lg font-normal max-w-md">
          Share your thoughts, connect with others, and make an impact.
        </p>
        <Link to="/register" className="mt-6 bg-black text-white px-6 py-2 rounded-lg">
          Start Reading
        </Link>
      </div>

      <footer className="absolute bottom-0 left-0 w-full py-2">
        <hr className="border-gray-600" />
        <div className="text-center text-base py-2">
          &copy; 2025 WriteWay. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
