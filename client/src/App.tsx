import React, { useState, createContext, useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Bughouse from 'pages/Bughouse/Bughouse';
import Choker from 'pages/Choker/Choker';
import NotFoundPage from 'pages/NotFound/NotFound';
import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import Rules from 'pages/Rules/Rules';
import Leaderboard from 'pages/Leaderboard/Leaderboard';
import SignUp from 'pages/Auth/SignUp';
import LogIn from 'pages/Auth/LogIn';
import Dashboard from 'pages/Dashboard/Dashboard';
import MyAccount from 'pages/MyAccount/MyAccount';
import { useAuth } from 'hooks/AuthContext';
import { initialState, reducer } from 'hooks/UseReducer';
import LogOut from 'pages/Auth/LogOut';

export const UserContext = createContext(null);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Router>
          <Navbar/>
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
                path="log-out"
                element={<LogOut />}
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
                path="my-account"
                element={<MyAccount />}
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
      </UserContext.Provider>
  );
}
