import browserHistory from '../../browser-history';
import { PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer';
import { Middleware } from 'redux';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string> | any) => {
        if (action.type === 'page/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
