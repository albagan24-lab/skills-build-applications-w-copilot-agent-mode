import { useEffect, useState } from 'react';
import { buildApiUrl, parseResponse } from '../api';

type Activity = {
  _id: string;
  userId: string;
  teamId?: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  performedAt: string;
};

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = buildApiUrl('activities');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setActivities(parseResponse<Activity>(data, 'activities')))
      .catch(() => setError('Unable to load activities'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h2>Activities</h2>
      <p>API endpoint: <code>{apiUrl}</code></p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} min
              <div>Calories: {activity.caloriesBurned}</div>
              <div>Performed at: {new Date(activity.performedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
