import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import Answer from "../models/Answer";
import Question from "../models/Question";

export const submitAnswer = async (req: AuthRequest, res: Response): Promise<void> => {
    const {questionId} = req.params
    
    const {  selectedOption } = req.body;
    const userId = req.userId; 
console.log(questionId)
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const question = await Question.findById(questionId);
    if (!question) {
        res.status(404).json({ message: "Question not found" });
        return;
    }

    const isCorrect = question.correctAnswer === selectedOption;

    await Answer.create({ userId, questionId, selectedOption });

    res.json({ message: "Answer submitted successfully", isCorrect });
};
