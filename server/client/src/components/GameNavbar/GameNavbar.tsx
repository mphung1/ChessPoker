import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/AuthContext';
import axios from 'axios';

const GameNavbar = () => {
  const { setAuth, user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const res = await axios.get('http://localhost:8080/api/auth/logout/', {
      // withCredentials: true,
    });
    // setAuth(false);
    localStorage.removeItem('token');
    alert('Log out Successfully');
    navigate('/login');
  };

  return (
    <section>
      <div className="navbar">
        <ul className="navbar-menu">
          <li>
            <Link to={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link to={'/profile'}>Welcome {user.username}</Link>
          </li>
          <li>
            <button
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <Outlet />
    </section>
  );
};

export default GameNavbar;
