import { useState, useEffect } from 'react';
import { Text } from '@mantine/core';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    async function getTopUsers() {
      const res = await fetch('/api/user/top-ratings', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setTopUsers(data.users);
      } else {
        alert(data.err);
      }
    }

      getTopUsers()
  }, [])

  return (
    <div>
      <div className='layout'>
          <div className="container">
                <i className="fas fa-crown"></i>
                <Text>Highest-rated players</Text>
              </div>
              <div className="body">
                <ol>
                {topUsers.map(user => {
                  return (
                    <li key={user.name}>
                      <mark>{user.name}</mark>
                      <small>{user.chesspoker_rating}</small>
                    </li>
                )})
                }
                </ol>
              </div>
        </div>
    </div>
  );
};

export default Leaderboard;
