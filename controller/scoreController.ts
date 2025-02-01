import {  Response } from 'express';
import Answer from '../models/Answer';
import { AuthRequest } from "../types/AuthRequest";

export const getTotalScore = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const answers = await Answer.find({ userId }).populate('questionId');

  let totalScore = 0;
  answers.forEach((answer) => {
    if (answer.selectedOption === (answer.questionId as any).correctAnswer) {
      totalScore++;
    }
  });

  res.json({ totalScore });
};