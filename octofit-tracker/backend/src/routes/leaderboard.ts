import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).select('-__v').lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
