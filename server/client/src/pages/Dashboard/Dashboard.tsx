import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import GameCard from 'components/GameCard/GameCard';
import PopUp from '../../components/PopUp/PopUp'
import './Dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
      }
    }
  }, []);

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
