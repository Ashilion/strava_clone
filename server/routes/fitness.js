import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {getFitnessNivoData} from '../utils/fitness.js'
import { getZonesNivo } from '../utils/data_calculs.js';

const router = express.Router();

/*READ */
router.get("/", verifyToken, getFitnessNivoData)
router.get("/zones", verifyToken, getZonesNivo)

export default router;