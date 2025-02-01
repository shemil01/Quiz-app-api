import express from 'express'
import {getQuestion} from '../controller/questionController'
import {postQuestion} from '../controller/questionController'
import {authMiddleware} from '../middleware/authenticate';
import { trycatch } from '../utils/tryCatch';


const router = express.Router()

router.post('/post-question',authMiddleware,trycatch(postQuestion))          
router.get('/question',authMiddleware,trycatch(getQuestion))          

export default router;