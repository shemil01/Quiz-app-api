import express from 'express'
import { submitAnswer } from '../controller/answerController';
import {authMiddleware} from '../middleware/authenticate';
import { trycatch } from '../utils/tryCatch';

const router = express.Router()

router.post('/answer/:questionId',authMiddleware,trycatch(submitAnswer))          

export default router;