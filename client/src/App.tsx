import React, { useContext, ReactNode, useReducer } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "context/authContext";
import NotFound from 'pages/NotFound';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Rules from 'pages/Rules';
import Leaderboard from 'pages/Leaderboard';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import AppNavbar from 'components/AppNavbar';
import Dashboard from 'pages/Dashboard';
import MyAccount from 'pages/MyAccount';
import AppError from 'pages/AppError';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: { children: ReactNode | any }) => {
    if (!currentUser || currentUser === undefined) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const queryClient = new QueryClient();

  const LandingLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  const AppLayout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <AppNavbar />
        <Outlet />
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingLayout />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/app",
          element: <Dashboard />,
        },
        {
          path: "/app/my-account",
          element: <MyAccount />,
        },
        {
          path: "*",
          element: <AppError />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
