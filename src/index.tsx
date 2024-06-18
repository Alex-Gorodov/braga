import { fetchBeersAction, fetchGuestsAction, fetchSubscribersAction, fetchUsersAction } from './store/api-actions';
import { App } from './components/app/app';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import './styles/style.sass';
import React from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchSubscribersAction());
store.dispatch(fetchGuestsAction());
store.dispatch(fetchBeersAction());
store.dispatch(fetchUsersAction());

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
