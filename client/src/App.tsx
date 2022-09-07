import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Layout from 'layouts/main';
import Choker from 'pages/Choker';
import Bughouse from 'pages/Bughouse';
import Bot from 'pages/Bughouse/Bot';
import Multiplayer from 'pages/Bughouse/Multiplayer';
import NotFoundPage from 'pages/NotFound';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
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
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}
