import express from 'express'
import { getTotalScore } from '../controller/scoreController';
import {authMiddleware} from '../middleware/authenticate';


const router = express.Router()

router.get('/score',authMiddleware,getTotalScore)          

export default router;