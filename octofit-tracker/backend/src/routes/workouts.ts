import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().select('-__v').lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

export default router;
