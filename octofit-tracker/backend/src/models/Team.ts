import { Schema, model, Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: string[];
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String, required: true }]
}, { timestamps: true });

export default model<TeamDocument>('Team', teamSchema);
