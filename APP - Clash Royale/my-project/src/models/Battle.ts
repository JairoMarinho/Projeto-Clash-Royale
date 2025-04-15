import mongoose, { Schema, Document, models } from 'mongoose';

interface Card {
  name: string;
}

interface Participant {
  crowns: number;
  startingTrophies: number;
  cards: Card[];
}

export interface Battle extends Document {
  playerTag: string;
  battleTime: string;
  type: string;
  isLadderTournament?: boolean;
  arenaId?: number;
  challengeTitle?: string;
  challengeWinCountBefore?: number;
  challengeWinCountAfter?: number;
  teamCrowns: number;
  opponentCrowns: number;
  teamTrophies: number;
  opponentTrophies: number;
  teamDeck: string[];
  opponentDeck: string[];
  winner: 'team' | 'opponent' | 'draw';
  team: Participant[];
  opponent: Participant[];
}

// Subschema para cards
const cardSchema = new Schema<Card>({
  name: { type: String, required: true },
}, { _id: false });

// Subschema para participantes
const participantSchema = new Schema<Participant>({
  crowns: { type: Number, required: true },
  startingTrophies: { type: Number, required: true },
  cards: { type: [cardSchema], default: [] },
}, { _id: false });

// Schema principal da batalha
const battleSchema = new Schema<Battle>({
  playerTag: { type: String, required: true },
  battleTime: { type: String, required: true },
  type: { type: String, required: true },
  isLadderTournament: Boolean,
  arenaId: Number,
  challengeTitle: String,
  challengeWinCountBefore: Number,
  challengeWinCountAfter: Number,
  teamCrowns: Number,
  opponentCrowns: Number,
  teamTrophies: Number,
  opponentTrophies: Number,
  teamDeck: [String],
  opponentDeck: [String],
  winner: { type: String, enum: ['team', 'opponent', 'draw'], required: true },
  team: { type: [participantSchema], default: [] },
  opponent: { type: [participantSchema], default: [] },
}, { timestamps: true });

// Evita duplicidade de batalha por jogador + horário
battleSchema.index({ playerTag: 1, battleTime: 1 }, { unique: true });

export const BattleModel = models.Battle || mongoose.model<Battle>('Battle', battleSchema);
