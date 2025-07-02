import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Firebase App (the core Firebase SDK) import and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config (replace with your own config)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
