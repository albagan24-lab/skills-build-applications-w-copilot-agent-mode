import { useEffect, useState } from 'react';
import { buildApiUrl, parseResponse } from '../api';

type Workout = {
  _id: string;
  title: string;
  description: string;
  durationMinutes: number;
  level: string;
  focusAreas: string[];
};

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = buildApiUrl('workouts');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWorkouts(parseResponse<Workout>(data, 'workouts')))
      .catch(() => setError('Unable to load workouts'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h2>Workouts</h2>
      <p>API endpoint: <code>{apiUrl}</code></p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.title}</strong> — {workout.level}
              <div>{workout.description}</div>
              <div>Duration: {workout.durationMinutes} min</div>
              <div>Focus: {workout.focusAreas.join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
