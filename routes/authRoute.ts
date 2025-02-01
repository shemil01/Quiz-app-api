import express from 'express';
import { login } from '../controller/authController';
import { trycatch } from '../utils/tryCatch';

const router = express.Router();

router.post('/login', trycatch(login));

export default router;