import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export default function main() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/bughouse">Bughouse</Link>
          </li>
          <li>
            <Link to="/choker">Choker</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
