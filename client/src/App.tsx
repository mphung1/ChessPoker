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
