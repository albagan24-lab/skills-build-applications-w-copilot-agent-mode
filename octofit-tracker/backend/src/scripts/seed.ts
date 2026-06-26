import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URL);
  console.log(`Connected to MongoDB at ${MONGO_URL}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'admin', teams: ['team-1', 'team-2'] },
    { name: 'Jordan Blake', email: 'jordan.blake@example.com', role: 'coach', teams: ['team-1'] },
    { name: 'Morgan Lee', email: 'morgan.lee@example.com', role: 'member', teams: ['team-2'] }
  ]);

  const teams = await Team.create([
    { name: 'Team Falcon', description: 'High-energy fitness squad focused on speed and endurance.', members: [users[0]._id.toString(), users[1]._id.toString()] },
    { name: 'Team Titan', description: 'Strength and recovery focused team for balanced athletes.', members: [users[0]._id.toString(), users[2]._id.toString()] }
  ]);

  await Activity.create([
    { userId: users[0]._id.toString(), teamId: teams[0]._id.toString(), type: 'running', durationMinutes: 38, distanceKm: 6.5, caloriesBurned: 420, performedAt: new Date('2026-06-20T08:30:00Z') },
    { userId: users[1]._id.toString(), teamId: teams[0]._id.toString(), type: 'cycling', durationMinutes: 50, distanceKm: 18.2, caloriesBurned: 620, performedAt: new Date('2026-06-21T10:00:00Z') },
    { userId: users[2]._id.toString(), teamId: teams[1]._id.toString(), type: 'swimming', durationMinutes: 40, caloriesBurned: 500, performedAt: new Date('2026-06-22T14:15:00Z') }
  ]);

  await LeaderboardEntry.create([
    { rank: 1, userId: users[0]._id.toString(), userName: users[0].name, score: 1240 },
    { rank: 2, userId: users[2]._id.toString(), userName: users[2].name, score: 1135 },
    { rank: 3, userId: users[1]._id.toString(), userName: users[1].name, score: 1090 }
  ]);

  await Workout.create([
    { title: 'Express Strength Circuit', description: 'A fast-paced strength routine with dumbbells and bodyweight.', durationMinutes: 30, level: 'intermediate', focusAreas: ['strength', 'mobility'] },
    { title: 'Recovery Flow', description: 'Low-impact mobility and breathing session for post-workout recovery.', durationMinutes: 25, level: 'beginner', focusAreas: ['recovery', 'flexibility'] },
    { title: 'Endurance Builder', description: 'Long cardio session to increase stamina and pacing.', durationMinutes: 45, level: 'advanced', focusAreas: ['endurance', 'conditioning'] }
  ]);

  console.log('Seed data creation complete.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
