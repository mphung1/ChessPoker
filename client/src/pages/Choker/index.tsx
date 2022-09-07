import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Choker() {
  return (
    <div>
      <div>Choker</div>
      <Outlet />
    </div>
);
}
