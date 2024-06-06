import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";
import { setUploadedNftPath, toggleSignInForm, toggleSignUpForm } from "../../actions";

const initialState: PageState = {
  uploadedNftPath: null,
  isSignInFormOpened: false,
  isSignUpFormOpened: false,
}

export const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUploadedNftPath, (state, action) => {
      const { path } = action.payload;
      state.uploadedNftPath = path;
    })
    .addCase(toggleSignInForm, (state, action) => {
      state.isSignInFormOpened = action.payload.isOpened;
    })
    .addCase(toggleSignUpForm, (state, action) => {
      state.isSignUpFormOpened = action.payload.isOpened;
    })
})
