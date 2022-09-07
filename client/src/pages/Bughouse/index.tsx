import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Bughouse() {
  return (
    <div className="Page">
      <div className="bughouse-nav">
        <ul>
          <li>
            <Link to="/bughouse/bot">Play with bot</Link>
          </li>
          <li>
            <Link to="/bughouse/multiplayer">Play with friend</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
