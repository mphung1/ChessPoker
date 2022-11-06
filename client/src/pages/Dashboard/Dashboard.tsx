import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import './Dashboard.scss';
import GameCard from 'components/GameCard/GameCard';
import PopUp from '../../components/PopUp/PopUp'

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [chips, setChips] = useState<number|string>(0);
  const [tempChips, setTempChips] = useState<number|string>(0);

  async function populateResource() {
    const res = await fetch('http://localhost:8080/api/user/chips', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    if (data.status === 'ok') {
      setChips(data.chips);
    } else {
      alert(data.err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        populateResource();
      }
    }
  }, []);

  async function updateChips(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/user/chips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        chips: tempChips,
      }),
    });

    const data = await res.json();
    if (data.status === 'ok') {
      setChips(tempChips);
      setTempChips(0);
    } else {
      alert(data.err);
    }
  }

  const togglePopup = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <div>
      <div className="game-cards">
        <GameCard
          gameMode="Bughouse"
          description="Bring captured pieces back into play."
          onClickJoin={togglePopup}
          onClickCreate={togglePopup}
        />
        <GameCard
          gameMode="Chess Poker"
          description="An interesting combination of chess & poker, inspired by Choker App."
          onClickJoin={togglePopup}
          onClickCreate={togglePopup}
        />
      </div>
      <h1> Your chips: {chips}</h1>
      <form onSubmit={updateChips}>
        <input
          type="text"
          placeholder="Set your chips"
          value={tempChips}
          onChange={(e) => setTempChips(e.target.value)}
        />
        <input
          type="submit"
          value="Update chips"
        />
      </form>
      {isOpenModal && <PopUp
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
      <Outlet />
    </div>
  );
};

export default Dashboard;
