import { Schema, model, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
}

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  focusAreas: [{ type: String, required: true }]
}, { timestamps: true });

export default model<WorkoutDocument>('Workout', workoutSchema);
