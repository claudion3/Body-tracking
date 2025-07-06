import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center bg-[url('../src/assets/gym_image1.jpg')] relative pt-16">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="z-10 w-full max-w-4xl px-4">
        {/* Profile header */}
        <div className="bg-gray-900/80 p-8 rounded-t-2xl backdrop-blur-sm border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your <span className="text-orange-400">Profile</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Track your fitness journey and achievements
          </p>
        </div>

        {/* Quick stats card */}
        <div className="bg-gray-900/70 p-6 border-x border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Current Weight</p>
              <p className="text-2xl font-bold text-white">72.5 kg</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Goal Weight</p>
              <p className="text-2xl font-bold text-white">68 kg</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-orange-400">-4.5 kg</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="bg-gray-900/80 p-6 rounded-b-2xl backdrop-blur-sm border border-gray-700 border-t-0 flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg 
                      hover:from-orange-600 hover:to-red-700 transition-all duration-300
                      font-semibold text-center"
          >
            Full Dashboard
          </Link>
          <Link
            to="/add-measurement"
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg border border-gray-600
                      hover:bg-gray-700 transition-all duration-300
                      font-semibold text-center"
          >
            Add Measurement
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-transparent text-red-400 rounded-lg border border-red-400
                      hover:bg-red-400/10 transition-all duration-300
                      font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
