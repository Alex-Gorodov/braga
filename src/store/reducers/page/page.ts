import { setStatusMessage, setUploadedPath, toggleCart, toggleGuestNotificationForm, toggleSignInForm, toggleSignUpForm } from "../../actions";
import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";

const initialState: PageState = {
  uploadedPath: '',
  isSignInFormOpened: false,
  isSignUpFormOpened: false,
  isGuestNotificationFormOpened: false,
  isCartOpened: false,
  statusMessage: null,
}

export const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUploadedPath, (state, action) => {
      const { path } = action.payload;
      path ? state.uploadedPath = path : state.uploadedPath = 'braga/img/avatars/user-7.png';
    })
    .addCase(toggleSignInForm, (state, action) => {
      state.isSignInFormOpened = action.payload.isOpened;
    })
    .addCase(toggleSignUpForm, (state, action) => {
      state.isSignUpFormOpened = action.payload.isOpened;
    })
    .addCase(toggleGuestNotificationForm, (state, action) => {
      state.isGuestNotificationFormOpened = action.payload.isOpened
    })
    .addCase(toggleCart, (state, action) => {
      state.isCartOpened = action.payload.isCartOpened;
    })
    .addCase(setStatusMessage, (state, action) => {
      state.statusMessage = action.payload.message;
    })
})
