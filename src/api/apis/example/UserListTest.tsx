// react-query를 사용하지 않은 코드

import React, { useState, useEffect } from 'react';
import { fetchUsers } from './Example';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserListTest = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      console.log(data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <h1>User List</h1>
        <button type="button" onClick={getUsers}>
          요청하기
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserListTest;
