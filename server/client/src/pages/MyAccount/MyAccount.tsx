import React, { useState, useEffect } from 'react';
import './MyAccount.scss';
import Hero from 'components/Hero/Hero';
import { Button } from 'components/Button/Button';
import Background from './bg5.jpg'

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    image: '',
  })
  const [userScores, setUserScores] = useState({
    bughouseW: 0,
    bughouseL: 0,
    chesspokerW: 0,
    chesspokerL: 0,
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
          bughouseW: data.scores.bughouse_wins,
          bughouseL: data.scores.bughouse_losses,
          chesspokerW: data.scores.chesspoker_wins,
          chesspokerL: data.scores.chesspoker_losses,
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
      <Hero background={Background}>
      <div className='page-container'>
        <div className='user-container'>

          <div className='user-block'>
            <img src={userInfo.image} className='user-image'/>
            <div className='user-info'>
              <h1> {userInfo.username}</h1>
              <h3 style={{color: 'gray'}}> {userInfo.email}</h3>
            </div>
            <Button> Edit profile </Button>
          </div>

          <div className='user-record'>
              <h2> Bughouse </h2>
              <p> {userScores.bughouseW}W - {userScores.bughouseL}L </p>
              <h2> Chesspoker </h2>
              <p> {userScores.chesspokerW}W - {userScores.chesspokerL}L </p>
          </div>
        </div>

        <div className='user-opponent'>
          <h2>
          Average opponent's rating
          </h2>
        </div>

        <div className='user-history'>
          <h1> Game History </h1>
        </div>

        </div>
      </Hero>
    </div>
  )
}

export default MyAccount;
