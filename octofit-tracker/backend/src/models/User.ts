import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  teams: string[];
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  teams: [{ type: String }]
}, { timestamps: true });

export default model<UserDocument>('User', userSchema);
