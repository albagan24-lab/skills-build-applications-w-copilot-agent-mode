import express from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
const apiUrl = `${apiHost}/api`;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on ${apiHost}`);
      console.log(`API base URL: ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
