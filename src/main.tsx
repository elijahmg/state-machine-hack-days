import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateMachineProvider } from './state-machine/context';

ReactDOM.render(
  <React.StrictMode>
    <StateMachineProvider>
      <App/>
    </StateMachineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
