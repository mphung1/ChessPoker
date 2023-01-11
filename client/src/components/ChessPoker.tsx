import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import socket from 'connections/socket';

export default function ChessPoker() {
  return (
    <div>
      <div className="center">
        <div
          className="user-content"
          style={{ marginBottom: '0.5rem' }}
        >
          <div className="user-info">
            <FaRegUser className="user-icon" />
            <div> User2 </div>
          </div>
          <div className="user-cards">
            <div className="user-card" />
            <div className="user-card" />
          </div>
        </div>

        <div className="table"></div>

        <div
          className="user-content"
          style={{ marginTop: '0.5rem' }}
        >
          <div className="user-info">
            <FaRegUser className="user-icon" />
            <div> User1 </div>
          </div>
          <div className="user-cards">
            <div className="user-card" />
            <div className="user-card" />
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn">
          <a> Fold </a>
        </button>
        <button className="btn">
          <a>Call</a>
        </button>
        <button className="btn">
          <a>Raise</a>
        </button>
      </div>

      <div id="bodybox">
        <div id="chatborder">
          <input
            type="text"
            name="chat"
            id="chatbox"
            placeholder="Click to chat."
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
}
