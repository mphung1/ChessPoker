import { useState, useEffect } from 'react';
import Hero from 'components/Hero/Hero';
import './Leaderboard.scss';
import background from './bg3.jpg';

const Leaderboard = () => {
  const [topBughouseUsers, setTopBughouseUsers] = useState([])
  const [topChesspokerUsers, setTopChesspokerUsers] = useState([])

  useEffect(() => {
    async function getTopBughouseUsers() {
      const res = await fetch('/api/user/top-bughouse-ratings', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setTopBughouseUsers(data.users);
      } else {
        alert(data.err);
      }
    }

    async function getTopChesspokerUsers() {
      const res = await fetch('/api/user/top-chesspoker-ratings', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setTopChesspokerUsers(data.users);
      } else {
        alert(data.err);
      }
    }

      getTopBughouseUsers();
      getTopChesspokerUsers()
  }, [])

  return (
    <div>
      <Hero background={background}>
      <div className='layout'>

          <div className="container">
            <div className="leaderboard">
              <div className="head">
                <i className="fas fa-crown"></i>
                <h1>Highest-rated Bughouse</h1>
              </div>
              <div className="body">
                <ol>
                {topBughouseUsers.map(user => {
                  return (
                    <li key={user.name}>
                      <mark>{user.name}</mark>
                      <small>{user.bughouse_rating}</small>
                    </li>
                )})
                }
                </ol>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="leaderboard">
              <div className="head">
                <i className="fas fa-crown"></i>
                <h1>Highest-rated ChessPoker</h1>
              </div>
              <div className="body">
                <ol>
                {topChesspokerUsers.map(user => {
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

        </div>
      </Hero>
    </div>
  );
};

export default Leaderboard;
