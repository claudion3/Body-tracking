import React from 'react';
import { UserProfile } from './types';

interface EditProfileFormProps {
  profile: UserProfile;
  formErrors: Record<string, string>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  formErrors,
  onInputChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.username ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                required
                autoComplete="username"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                required
                autoComplete="email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={onInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.age ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                min={1}
                max={120}
              />
              {formErrors.age && (
                <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={onInputChange}
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
              <label className="block text-gray-400 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.height ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                min={50}
                max={250}
              />
              {formErrors.height && (
                <p className="text-red-500 text-sm mt-1">{formErrors.height}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.weight ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                min={20}
                max={300}
              />
              {formErrors.weight && (
                <p className="text-red-500 text-sm mt-1">{formErrors.weight}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">
                Goal Weight (kg)
              </label>
              <input
                type="number"
                name="goalWeight"
                value={profile.goalWeight}
                onChange={onInputChange}
                className={`w-full px-4 py-2 bg-gray-700 border ${formErrors.goalWeight ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                min={20}
                max={300}
              />
              {formErrors.goalWeight && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.goalWeight}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Activity Level</label>
              <select
                name="activityLevel"
                value={profile.activityLevel}
                onChange={onInputChange}
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
          onClick={onCancel}
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
  );
};

export default EditProfileForm;
