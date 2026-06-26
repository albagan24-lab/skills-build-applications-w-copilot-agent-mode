import { useEffect, useState } from 'react';
import { buildApiUrl, parseResponse } from '../api';

type Team = {
  _id: string;
  name: string;
  description: string;
  members: string[];
};

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = buildApiUrl('teams');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTeams(parseResponse<Team>(data, 'teams')))
      .catch(() => setError('Unable to load teams'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h2>Teams</h2>
      <p>API endpoint: <code>{apiUrl}</code></p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong>
              <div>{team.description}</div>
              <div>Members: {team.members.length}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
