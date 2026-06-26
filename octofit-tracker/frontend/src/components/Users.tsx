import { useEffect, useState } from 'react';
import { buildApiUrl, parseResponse } from '../api';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  teams: string[];
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = buildApiUrl('users');

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUsers(parseResponse<User>(data, 'users')))
      .catch(() => setError('Unable to load users'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h2>Users</h2>
      <p>API endpoint: <code>{apiUrl}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> ({user.role}) — {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
