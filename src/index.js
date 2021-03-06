import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';

ReactDOM.render(
  // <React.StrictMode>
    // <ActionCableProvider url={`http://localhost:8000/cable`}>
  <ActionCableProvider url={`wss://guarded-taiga-97709.herokuapp.com/cable`}>
      <App />
    </ActionCableProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();