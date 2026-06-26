import { useEffect, useState } from 'react';
import { buildApiUrl, parseResponse } from '../api';

type LeaderboardEntry = {
  _id: string;
  rank: number;
  userId: string;
  userName: string;
  score: number;
};

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = buildApiUrl('leaderboard');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEntries(parseResponse<LeaderboardEntry>(data, 'leaderboard')))
      .catch(() => setError('Unable to load leaderboard'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API endpoint: <code>{apiUrl}</code></p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ol>
          {entries.map((entry) => (
            <li key={entry._id}>
              {entry.rank}. {entry.userName} — {entry.score} points
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
