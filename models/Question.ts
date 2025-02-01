import mongoose, { Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);