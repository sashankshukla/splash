import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="593968135288-s5uf8ttnu4uuk7b2k7uau15sl6v9gctm.apps.googleusercontent.com">
        {' '}
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);
