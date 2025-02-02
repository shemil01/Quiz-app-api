import { Request, Response } from "express";
import Question from "../models/Question";
import Answer from "../models/Answer";
import { AuthRequest } from "../types/AuthRequest";

/// add questions
export const postQuestion = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { question, options, correctAnswer } = req.body;

  if (!question || !options || !correctAnswer) {
    res.status(400).json({
      message: "All fields are required: question, options, correctAnswer",
    });
    return;
  }

  if (!Array.isArray(options) || options.length !== 4) {
    res.status(400).json({ message: "Options must be an array of 4 strings" });
    return;
  }

  if (!options.includes(correctAnswer)) {
    res
      .status(400)
      .json({ message: "Correct answer must be one of the options" });
    return;
  }

  const newQuestion = await Question.create({
    question,
    correctAnswer,
    options,
  });
  res.status(201).json(newQuestion);
};

/// get questions
export const getQuestion = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const sessionId = req.sessionId;
  
  const answredQuestion = await Answer.find({ userId ,sessionId}).distinct("questionId");
  const question = await Question.findOne({ _id: { $nin: answredQuestion } });

  if (!question) {
    res.status(404).json({ message: " Question not found" });
    return;
  }
  if (answredQuestion.length >= 5) {
    res.json({ message: "You have compleated the quiz" });
    return;
  }

  res.json(question);
};
