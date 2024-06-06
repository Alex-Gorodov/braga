import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.sass';
import { App } from './components/app/app';
import { store } from './store';
import { fetchBeersAction, fetchCartAction, fetchUsersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchBeersAction());
store.dispatch(fetchUsersAction());
store.dispatch(fetchCartAction());

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
