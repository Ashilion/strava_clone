import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import { getHeartrateNivo, getPaceNivo, getDeniveleNivo, getGeoJson } from '../utils/data_calculs.js';
import { getFeedActivities , getActivity} from '../controllers/activites.js';


const router = express.Router();

/*READ */
router.get("/heartrate", verifyToken, getHeartrateNivo)
router.get("/pace", verifyToken, getPaceNivo)
router.get("/denivele", verifyToken, getDeniveleNivo)
router.get("/geojson", verifyToken, getGeoJson)

router.get("/", verifyToken, getFeedActivities)
router.get("/:id", verifyToken, getActivity)

export default router;