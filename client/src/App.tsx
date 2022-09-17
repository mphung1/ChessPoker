import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Layout from 'routes/main';
import Choker from 'pages/Choker';
import Bughouse from 'pages/Bughouse';
import Bot from 'pages/Bughouse/Bot';
import Multiplayer from 'pages/Bughouse/Multiplayer';
import NotFoundPage from 'pages/NotFound';
import { UserContext } from './middleware/UserContext';
import Navbar from 'components/Navbar/Navbar';
import Hero from 'components/Hero/Hero';
import Rules from 'pages/Rules/Rules';
import Leaderboard from 'pages/Leaderboard/Leaderboard';
import SignUp from 'pages/Auth/SignUp';
import LogIn from 'pages/Auth/LogIn';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Hero />}
          />
          <Route
            path="bughouse"
            element={<Bughouse />}
          >
            <Route
              path="bot"
              element={<Bot />}
            />
            <Route
              path="multiplayer"
              element={<Multiplayer />}
            />
          </Route>
          <Route
            path="choker"
            element={<Choker />}
          />
          <Route
            path="Rules"
            element={<Rules />}
          />
          <Route
            path="Leaderboard"
            element={<Leaderboard />}
          />
          <Route
            path="SignUp"
            element={<SignUp />}
          />
          <Route
            path="LogIn"
            element={<LogIn />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}
