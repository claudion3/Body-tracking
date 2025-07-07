import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';

interface UserProfile {
  username: string;
  email: string;
  fullName?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  goalWeight?: number;
  activityLevel?: 'sedentary' | 'light' | 'active' | 'very active';
  avatarUrl?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        toast.error('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]:
        name === 'age' ||
        name === 'height' ||
        name === 'weight' ||
        name === 'goalWeight'
          ? Number(value)
          : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/users/me', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        '/api/users/change-password',
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success('Password changed successfully');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordForm(false);
    } catch (err) {
      toast.error('Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('/api/users/delete-account', {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('token');
        toast.success('Account deleted successfully');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete account');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="pt-20 max-w-6xl mx-auto p-4 sm:p-8">
        {/* Dashboard-style stats header */}
        <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-orange-400">
              Profile Overview
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center space-x-2"
              >
                {editMode ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Cancel Edit</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>
                  {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Username',
                value: profile.username || '--',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ),
              },
              {
                label: 'Current Weight',
                value: profile.weight ? `${profile.weight} kg` : '--',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                ),
              },
              {
                label: 'Goal Weight',
                value: profile.goalWeight ? `${profile.goalWeight} kg` : '--',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
              {
                label: 'Activity Level',
                value: profile.activityLevel
                  ? profile.activityLevel.charAt(0).toUpperCase() +
                    profile.activityLevel.slice(1)
                  : '--',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 flex items-center space-x-4"
              >
                <div className="p-2 bg-orange-500/20 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden">
          {!editMode ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Full Name</p>
                      <p className="text-lg">
                        {profile.fullName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-lg">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Age</p>
                      <p className="text-lg">{profile.age || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Gender</p>
                      <p className="text-lg">
                        {profile.gender
                          ? profile.gender.charAt(0).toUpperCase() +
                            profile.gender.slice(1)
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
                    Fitness Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Height</p>
                      <p className="text-lg">
                        {profile.height
                          ? `${profile.height} cm`
                          : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Current Weight</p>
                      <p className="text-lg">
                        {profile.weight
                          ? `${profile.weight} kg`
                          : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Goal Weight</p>
                      <p className="text-lg">
                        {profile.goalWeight
                          ? `${profile.goalWeight} kg`
                          : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Activity Level</p>
                      <p className="text-lg">
                        {profile.activityLevel
                          ? profile.activityLevel
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(' ')
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600/90 hover:bg-red-700 rounded-lg transition flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={profile.fullName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={profile.age || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={profile.gender || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
                    Fitness Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={profile.height || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={profile.weight || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Goal Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="goalWeight"
                        value={profile.goalWeight || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Activity Level
                      </label>
                      <select
                        name="activityLevel"
                        value={profile.activityLevel || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select Activity Level</option>
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Light</option>
                        <option value="active">Active</option>
                        <option value="very active">Very Active</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {showPasswordForm && (
            <div className="mt-8 p-6 bg-gray-700/50 rounded-lg border-t border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-4 max-w-md"
              >
                <div>
                  <label className="block text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
