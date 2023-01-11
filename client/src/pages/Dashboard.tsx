import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import {
  createStyles
} from '@mantine/core';

interface Props {
  gameMode: string;
  description: string;
  onClickJoin: any;
  onClickCreate: any;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const togglePopup = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <div>
      <div className="game-cards">
      <div className="wrapper">
        <div className="overview-info">
          <div className="mode-info">
            <div className="image">
              <img
                src="https://i.imgur.com/ckSgzLQ.png"
                alt="ps5 controller"
              />
            </div>
          </div>
        </div>

        <div className="mode-specifications">
          <div className="button-group">
            <button className="single-button">
              <p>Join Room</p>
              <div className="buttonaction">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>

            <button className="single-button">
              <p>Create Room</p>
              <div className="buttonaction">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
