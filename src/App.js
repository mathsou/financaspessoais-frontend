import React from 'react';
import './global.css';
import Routes from './routes';
import {Router} from 'react-router-dom'

import history from './history';
import {AuthProvider} from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes/>
      </Router>
    </AuthProvider>
  );
}

export default App;
