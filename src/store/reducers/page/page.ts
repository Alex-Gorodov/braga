import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";
import { toggleSignInForm, toggleSignUpForm } from "../../actions";

const initialState: PageState = {
  isSignInFormOpened: false,
  isSignUpFormOpened: false,
}

export const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleSignInForm, (state, action) => {
      state.isSignInFormOpened = action.payload.isOpened;
    })
    .addCase(toggleSignUpForm, (state, action) => {
      state.isSignUpFormOpened = action.payload.isOpened;
    })
})
