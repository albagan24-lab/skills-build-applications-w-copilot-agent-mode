import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().select('-__v').lean();
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

export default router;
