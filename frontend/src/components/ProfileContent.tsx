import React from 'react';
import StatCard from './shared/StatCard';
import { UserProfile } from './types';

interface ProfileContentProps {
  profile: UserProfile;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile }) => {
  return (
    <section className="flex-1 bg-gray-800/90 rounded-2xl border border-gray-700 overflow-hidden shadow-lg">
      <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-orange-400 tracking-tight">
            Profile Overview
          </h2>
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
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700 tracking-tight">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 font-medium">Full Name</p>
                <p className="text-lg font-semibold">
                  {profile.fullName || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Age</p>
                <p className="text-lg font-semibold">
                  {profile.age || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Gender</p>
                <p className="text-lg font-semibold">
                  {profile.gender
                    ? profile.gender.charAt(0).toUpperCase() +
                      profile.gender.slice(1)
                    : 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700 tracking-tight">
              Fitness Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 font-medium">Height</p>
                <p className="text-lg font-semibold">
                  {profile.height ? `${profile.height} cm` : 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Current Weight</p>
                <p className="text-lg font-semibold">
                  {profile.weight ? `${profile.weight} kg` : 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Goal Weight</p>
                <p className="text-lg font-semibold">
                  {profile.goalWeight
                    ? `${profile.goalWeight} kg`
                    : 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Activity Level</p>
                <p className="text-lg font-semibold">
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
      </div>
    </section>
  );
};

export default ProfileContent;
