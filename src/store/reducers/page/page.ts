import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";
import { setUploadedPath, toggleSignInForm, toggleSignUpForm } from "../../actions";

const initialState: PageState = {
  uploadedPath: '',
  isSignInFormOpened: false,
  isSignUpFormOpened: false,
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
})
