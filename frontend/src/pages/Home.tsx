import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-end bg-cover bg-center p-4 bg-[url('../src/assets/gym_image1.jpg')] relative">
      {/* Gradient overlay - stronger on left, lighter on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-0"></div>

      {/* Card positioned on right (change justify-end to justify-start for left) */}
      <div className="bg-gray-900/80 p-8 rounded-2xl shadow-xl w-full max-w-md z-10 backdrop-blur-sm border border-gray-600/30 mr-8 lg:mr-16 my-8">
        <div className="text-left mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Transform Your <span className="text-orange-400">Body</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Start tracking your fitness journey today
          </p>
        </div>

        <div className="flex flex-col space-y-4 mb-10">
          <Link
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg 
                      hover:from-orange-600 hover:to-red-700 transition-all duration-300
                      font-semibold text-center shadow-lg hover:shadow-xl
                      focus:outline-none focus:ring-4 focus:ring-orange-500/30"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-transparent border-2 border-gray-500 text-white rounded-lg 
                      hover:bg-gray-800/40 transition-all duration-300
                      font-semibold text-center
                      focus:outline-none focus:ring-4 focus:ring-orange-500/30"
          >
            Existing Member
          </Link>
        </div>

        <div className="space-y-4 text-left">
          {[
            'Personalized workout tracking',
            'Body measurement analytics',
            'Goal achievement system',
          ].map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-orange-500/20 p-2 rounded-lg mr-4">
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
