import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Bot from 'pages/Bot';
import Bughouse from 'pages/Bughouse';
import Choker from 'pages/Choker';
import NotFoundPage from 'pages/NotFound';
import { UserContext } from './middleware/UserContext';
import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import Rules from 'pages/Rules/Rules';
import Leaderboard from 'pages/Leaderboard/Leaderboard';
import SignUp from 'pages/Auth/SignUp';
import LogIn from 'pages/Auth/LogIn';
import Game from 'pages/Game/Game';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="Game"
            element={<Game />}
          >
            <Route
              path="bot"
              element={<Bot />}
            />
            <Route
              path="bughouse"
              element={<Bughouse />}
            />
            <Route
              path="choker"
              element={<Choker />}
            />
          </Route>

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
