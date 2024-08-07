import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { requireAuthorization, setUserInformation } from '../../actions';
import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../const';
import { AuthState } from '../../../types/state';

export const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('braga-user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving token from localStorage', error);
    return null;
  }
};

const initialUserInfo = getUserFromLocalStorage();

const initialState: AuthState = {
  authorizationStatus: initialUserInfo ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
  userInfo: initialUserInfo || {
    id: '',
    email: '',
    token: ''
  },
};

export const authReducer: ReducerWithInitialState<AuthState> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder
    .addCase(requireAuthorization, (state: AuthState, action): void => {
      const {authorizationStatus} = action.payload;
      state.authorizationStatus = authorizationStatus;
    })
    .addCase(setUserInformation, (state, action) => {
      const {userInformation} = action.payload;
      state.userInfo = userInformation;
    })
});
