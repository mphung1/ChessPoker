import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "context/authContext";
import { MantineProvider } from '@mantine/core';
import 'App.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
    theme={{
      fontFamily: 'Verdana, sans-serif',
      fontFamilyMonospace: 'Monaco, Courier, monospace',
      headings: { fontFamily: 'Greycliff CF, sans-serif' },
    }}
    >
      <AuthContextProvider>
        <App />
      </AuthContextProvider>  
    </MantineProvider>
  </React.StrictMode>
);
