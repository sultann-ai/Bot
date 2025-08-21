import express from 'express';
import { analyzeSentiment, getHistory } from '../controllers/sentimentController.js';


const router = express.Router();


router.post('/analyze', analyzeSentiment);
router.get('/history', getHistory);


export default router;