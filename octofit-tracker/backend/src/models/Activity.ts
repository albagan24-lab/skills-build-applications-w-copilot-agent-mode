import { Schema, model, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: string;
  teamId?: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: String, required: true },
  teamId: { type: String },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  performedAt: { type: Date, required: true }
}, { timestamps: true });

export default model<ActivityDocument>('Activity', activitySchema);
