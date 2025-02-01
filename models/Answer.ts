import mongoose, { Document } from 'mongoose';

export interface IAnswer extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  questionId: mongoose.Schema.Types.ObjectId;
  selectedOption: string;      
}

const AnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: String, required: true },
});

export default mongoose.model<IAnswer>('Answer', AnswerSchema);