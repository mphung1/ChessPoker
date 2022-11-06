import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Bughouse from 'pages/Bughouse/Bughouse';
import Choker from 'pages/Choker/Choker';
import NotFoundPage from 'pages/NotFound/NotFound';
// import { UserContext } from './middleware/UserContext';
import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import Rules from 'pages/Rules/Rules';
import Leaderboard from 'pages/Leaderboard/Leaderboard';
import SignUp from 'pages/Auth/SignUp';
import LogIn from 'pages/Auth/LogIn';
import Dashboard from 'pages/Dashboard/Dashboard';
import {useAuth} from 'hooks/AuthContext';
import GameNavbar from 'components/GameNavbar/GameNavbar'

export default function App() {
  // const { auth } = useAuth();
  const [isUserLoggedIn, setUserLoggedIn] = useState(false)

  const user = localStorage.getItem('token')
  if (user) {
    setUserLoggedIn(true)
  }

  const userAuth = () => {
    setUserLoggedIn(!isUserLoggedIn)
    window.location.href = '/log-in';
  }

  return (
    <div className="App">
      <Router>
      <Navbar isUserLoggedIn={isUserLoggedIn} userAuth={userAuth}/>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="rules"
            element={<Rules />}
          />
          <Route
            path="leaderboard"
            element={<Leaderboard />}
          />
          <Route
            path="sign-up"
            element={<SignUp />}
          />
          <Route
            path="log-in"
            element={<LogIn />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route
            path="bughouse"
            element={<Bughouse />}
          />
          <Route
            path="choker"
            element={<Choker />}
          />
        </Routes>
      </Router>
    </div>
  );
}
