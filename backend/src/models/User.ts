import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../utils/types';

// Define the IUser interface


// Define the User schema
const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile fields
    fullName: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    height: { type: Number },
    weight: { type: Number },
    goalWeight: { type: Number },
    activityLevel: { type: String, enum: ['sedentary', 'light', 'active', 'very active'] },
    avatarUrl: { type: String },
    joinedAt: { type: Date, default: Date.now },
    lastLoginAt: { type: Date }
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;