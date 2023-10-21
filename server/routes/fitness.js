import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {getFitnessNivoData} from '../utils/fitness.js'

const router = express.Router();

/*READ */
router.get("/", verifyToken, getFitnessNivoData)

export default router;