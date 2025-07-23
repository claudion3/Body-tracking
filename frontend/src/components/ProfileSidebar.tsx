import React from 'react';
import { UserProfile } from './types';

interface ProfileSidebarProps {
  profile: UserProfile;
  openEditProfileModal: () => void;
  openPasswordModal: () => void;
  openDeleteModal: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  openEditProfileModal,
  openPasswordModal,
  openDeleteModal,
}) => {
  return (
    <aside className="md:w-1/3 bg-gray-800/90 p-6 rounded-2xl border border-gray-700 flex flex-col items-center shadow-lg mb-8 md:mb-0">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400 mb-4 bg-gray-900 flex items-center justify-center shadow-md">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        ) : (
          <svg
            className="w-20 h-20 text-gray-600"
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
        )}
      </div>
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold text-orange-400 mb-1 truncate max-w-full break-all"
          title={profile.username}
        >
          {profile.username}
        </h2>
        <p className="text-gray-400 mb-2 text-sm">{profile.email}</p>
        <div className="text-xs text-gray-400 mb-1">
          Joined:{' '}
          {profile.joinedAt && !isNaN(Date.parse(profile.joinedAt))
            ? new Date(profile.joinedAt).toLocaleDateString()
            : '--'}
        </div>
        <div className="text-xs text-gray-400">
          Last Login:{' '}
          {profile.lastLoginAt && !isNaN(Date.parse(profile.lastLoginAt))
            ? new Date(profile.lastLoginAt).toLocaleString()
            : '--'}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-auto">
        <button
          onClick={openEditProfileModal}
          className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition text-white font-semibold flex items-center justify-center gap-2 shadow"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Profile
        </button>
        <button
          onClick={openPasswordModal}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition text-white font-semibold flex items-center justify-center gap-2 shadow"
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
          Change Password
        </button>
        <button
          onClick={openDeleteModal}
          className="w-full px-4 py-2 bg-red-600/90 hover:bg-red-700 rounded-lg transition text-white font-semibold flex items-center justify-center gap-2 shadow"
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
          Delete Account
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
