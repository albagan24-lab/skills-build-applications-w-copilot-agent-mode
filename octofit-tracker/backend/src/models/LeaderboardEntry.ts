import { Schema, model, Document } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  rank: number;
  userId: string;
  userName: string;
  score: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  rank: { type: Number, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true }
}, { timestamps: true });

export default model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
