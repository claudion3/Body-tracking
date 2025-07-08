export interface UserProfile {
    username: string;
    email: string;
    fullName: string;
    age: string;
    gender: 'male' | 'female' | 'other' | '';
    height: string;
    weight: string;
    goalWeight: string;
    activityLevel: 'sedentary' | 'light' | 'active' | 'very active' | '';
    avatarUrl: string;
    joinedAt: string;
    lastLoginAt: string;
}

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}