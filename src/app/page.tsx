import { getUsers } from '@/lib/database';
import { User } from '@/entity/User';

export default async function Home() {
  let users: User[] = [];
  let error = '';

  try {
    users = await getUsers();
  } catch (err) {
    console.error('Database error:', err);
    error = 'Failed to load users from database.';
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <p>This is a fullstack Next.js application with TypeORM and SQLite.</p>
      
      <h2>Users from Database</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : users.length === 0 ? (
        <p>No users found in the database.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
      
      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#555' }}>
        Database is automatically initialized with a sample user on first run.
      </p>
    </main>
  );
}
