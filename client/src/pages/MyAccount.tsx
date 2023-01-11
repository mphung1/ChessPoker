import React, { useState, useEffect } from 'react';

const MyAccount = () => {
  const [userRatings, setUserRatings] = useState();

  useEffect(() => {
    async function getUserRatings() {
      const res = await fetch('/api/user/ratings', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setUserRatings(data.ratings);
      } else {
        alert(data.err);
      }
    }

      getUserRatings();
  }, [])

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    image: '',
  })
  const [userScores, setUserScores] = useState({
    win: 0,
    loss: 0,
  })

  useEffect(() => {
    async function getUserInfo() {
      const res = await fetch('/api/user/info', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setUserInfo({
          username: data.name,
          email: data.email,
          image: data.image,
        })
      } else {
        alert(data.err);
      }
    }

    async function getUserScores() {
      const res = await fetch('/api/user/scores', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setUserScores({
          win: data.scores.chesspoker_wins,
          loss: data.scores.chesspoker_losses,
        })
      } else {
        alert(data.err);
      }
    }

    getUserInfo();
    getUserScores()
  }, []);

  return (
    <div>
      <div className='page-container'>
        <div className='user-container'>

          <div className='user-block'>
            <img src={userInfo.image} className='user-image'/>
            <div className='user-info'>
              <h1> {userInfo.username}</h1>
              <h3 style={{color: 'gray'}}> {userInfo.email}</h3>
            </div>
            <button> Edit profile </button>
          </div>

          <div className='user-record'>
              <h2> History </h2>
              <p> {userScores.win}W - {userScores.loss}L </p>
          </div>
        </div>

        <div className='user-opponent'>
          <h2>
          Average opponent's rating
          </h2>
        </div>

        </div>
    </div>
  )
}

export default MyAccount;
