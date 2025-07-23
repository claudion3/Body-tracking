import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/shared/Header';
import Modal from '../components/shared/Modal';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileContent from '../components/ProfileContent';
import EditProfileForm from '../components/EditProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import DeleteAccountConfirmation from '../components/DeleteAccountConfirmation';
import { UserProfile, PasswordData } from '../components/types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    gender: '',
    activityLevel: '',
    fullName: '',
    age: '',
    height: '',
    weight: '',
    goalWeight: '',
    avatarUrl: '',
    joinedAt: '',
    lastLoginAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    'edit' | 'password' | 'delete' | null
  >(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not authenticated. Please log in again.');
      navigate('/login');
      setLoading(false);
      return;
    }
    try {
      console.log('Token from localStorage:', token);
      const response = await axios.get('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('response', response.data);
      setProfile({
        username: response.data.username || '',
        email: response.data.email || '',
        gender: response.data.gender || '',
        activityLevel: response.data.activityLevel || '',
        fullName: response.data.fullName || '',
        age: response.data.age ? String(response.data.age) : '',
        height: response.data.height ? String(response.data.height) : '',
        weight: response.data.weight ? String(response.data.weight) : '',
        goalWeight: response.data.goalWeight
          ? String(response.data.goalWeight)
          : '',
        avatarUrl: response.data.avatarUrl || '',
        joinedAt: response.data.joinedAt || '',
        lastLoginAt: response.data.lastLoginAt || '',
      });
    } catch (err) {
      console.error('Fetch profile failed:', err);
      toast.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const validateForm = (profileToValidate: UserProfile): boolean => {
    const errors: Record<string, string> = {};

    if (!profileToValidate.username.trim()) {
      errors.username = 'Username is required';
    } else if (profileToValidate.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!profileToValidate.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(profileToValidate.email)) {
      errors.email = 'Invalid email format';
    }

    if (
      profileToValidate.age &&
      (Number(profileToValidate.age) < 1 || Number(profileToValidate.age) > 120)
    ) {
      errors.age = 'Age must be between 1 and 120';
    }

    if (
      profileToValidate.height &&
      (Number(profileToValidate.height) < 50 ||
        Number(profileToValidate.height) > 250)
    ) {
      errors.height = 'Height must be between 50cm and 250cm';
    }

    if (
      profileToValidate.weight &&
      (Number(profileToValidate.weight) < 20 ||
        Number(profileToValidate.weight) > 300)
    ) {
      errors.weight = 'Weight must be between 20kg and 300kg';
    }

    if (
      profileToValidate.goalWeight &&
      (Number(profileToValidate.goalWeight) < 20 ||
        Number(profileToValidate.goalWeight) > 300)
    ) {
      errors.goalWeight = 'Goal weight must be between 20kg and 300kg';
    }

    if (
      profileToValidate.weight &&
      profileToValidate.goalWeight &&
      Number(profileToValidate.weight) < Number(profileToValidate.goalWeight)
    ) {
      errors.goalWeight = 'Goal weight should be less than current weight';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProfile) return;

    const isValid = validateForm(editProfile);
    if (!isValid) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not authenticated. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      await axios.put(
        '/api/user/me',
        {
          username: editProfile.username,
          email: editProfile.email,
          gender: editProfile.gender,
          activityLevel: editProfile.activityLevel,
          fullName: editProfile.fullName,
          age: Number(editProfile.age),
          height: Number(editProfile.height),
          weight: Number(editProfile.weight),
          goalWeight: Number(editProfile.goalWeight),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setProfile((prev) => ({
        ...prev,
        ...editProfile,
      }));
      toast.success('Profile updated successfully');
      closeModal();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || 'Failed to update profile');
      } else {
        toast.error('Failed to update profile');
      }
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not authenticated. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      await axios.put(
        '/api/user/me/change-password',
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
      closeModal();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || 'Failed to change password');
      } else {
        toast.error('Failed to change password');
      }
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not authenticated. Please log in again.');
      navigate('/login');
      return;
    }
    try {
      await axios.delete('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || 'Failed to delete account');
      } else {
        toast.error('Failed to delete account');
      }
    }
  };

  const openModal = useCallback(
    (type: 'edit' | 'password' | 'delete') => {
      setModalType(type);
      if (type === 'edit') {
        setEditProfile(profile);
      }
      setIsModalOpen(true);
    },
    [profile],
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setFormErrors({});
    setEditProfile(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'edit':
        return editProfile ? (
          <EditProfileForm
            profile={editProfile}
            formErrors={formErrors}
            onInputChange={handleEditInputChange}
            onSubmit={handleProfileSubmit}
            onCancel={closeModal}
          />
        ) : null;
      case 'password':
        return (
          <ChangePasswordForm
            passwordData={passwordData}
            onChange={handlePasswordChange}
            onSubmit={handlePasswordSubmit}
            onCancel={closeModal}
          />
        );
      case 'delete':
        return (
          <DeleteAccountConfirmation
            onCancel={closeModal}
            onConfirm={handleDeleteAccount}
          />
        );
      default:
        return null;
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
      <main className="pt-24 max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <ProfileSidebar
            profile={profile}
            openEditProfileModal={() => openModal('edit')}
            openPasswordModal={() => openModal('password')}
            openDeleteModal={() => openModal('delete')}
          />
          <ProfileContent profile={profile} />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === 'password'
            ? 'Change Password'
            : modalType === 'edit'
              ? 'Edit Profile'
              : modalType === 'delete'
                ? 'Confirm Deletion'
                : ''
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Profile;
