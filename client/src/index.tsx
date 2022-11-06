import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'App.scss';
import AuthProvider from 'hooks/AuthContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
