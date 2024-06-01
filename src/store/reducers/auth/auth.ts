import { AuthorizationStatus } from '../../../const';
import { AuthState } from '../../../types/state';
import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { requireAuthorization } from '../../actions';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const authReducer: ReducerWithInitialState<AuthState> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder
      .addCase(requireAuthorization, (state: AuthState, action): void => {
        const {authorizationStatus} = action.payload;
        state.authorizationStatus = authorizationStatus;
      })
  }
);
