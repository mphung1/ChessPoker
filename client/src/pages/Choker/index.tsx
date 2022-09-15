import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import socket from '../../connection/socket';

export default function Choker() {
  const [message, setMessage] = useState('');

  socket.on('message', (text: string) => {
      setMessage(text);
  });

  // socket.on('createTable')

  return (
    <div>
      <div>Choker</div>
      <div>{message}</div>
      <Outlet />
    </div>
);
}
