import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import { getHeartrateNivo, getPaceNivo, getDeniveleNivo } from '../utils/data_calculs.js';
import { getFeedActivities } from '../controllers/activites.js';

const router = express.Router();

/*READ */
router.get("/heartrate", verifyToken, getHeartrateNivo)
router.get("/pace", verifyToken, getPaceNivo)
router.get("/denivele", verifyToken, getDeniveleNivo)

router.get("/", verifyToken, getFeedActivities)

export default router;