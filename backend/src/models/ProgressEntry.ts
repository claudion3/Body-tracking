import mongoose, { Document, Schema } from 'mongoose';

// Define the IProgressEntry interface
export interface IProgressEntry extends Document {
  userId: mongoose.Types.ObjectId;
  weight: number;
  hipSize: number;
  waistSize: number;
  date: Date;
}

// Define the ProgressEntry schema
const ProgressEntrySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true },
  hipSize: { type: Number, required: true },
  waistSize: { type: Number, require: true },
  date: { type: Date, default: Date.now },
});

// Export the model and interface
const ProgressEntry = mongoose.model<IProgressEntry>('ProgressEntry', ProgressEntrySchema);
export default ProgressEntry;