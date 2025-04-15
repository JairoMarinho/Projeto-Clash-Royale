// models/Player.ts
import mongoose, { Schema, Document, models } from 'mongoose';

export interface Player extends Document {
  tag: string;
  name: string;
  trophies: number;
  expLevel: number;
  totalDonations: number;
}

const playerSchema = new Schema<Player>({
  tag: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  trophies: { type: Number, required: true },
  expLevel: { type: Number, required: true },
  totalDonations: { type: Number, required: true },
});

export const PlayerModel = models.Player || mongoose.model<Player>('Player', playerSchema);
