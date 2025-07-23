import React from 'react';

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  passwordData: PasswordData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  passwordData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-gray-400 mb-1">Current Password</label>
        <input
          type="password"
          name="oldPassword"
          value={passwordData.oldPassword}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          minLength={8}
        />
      </div>
      <div>
        <label className="block text-gray-400 mb-1">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          minLength={8}
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
      </div>
      <div>
        <label className="block text-gray-400 mb-1">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          minLength={8}
        />
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
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
  );
};

export default ChangePasswordForm;
