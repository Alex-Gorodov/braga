import { createReducer } from "@reduxjs/toolkit";
import { PageState } from "../../../types/state";
import { addItemToCart } from "../../actions";

const initialState: PageState = {
  isCartopened: false,
  cartItems: []
}

export const pageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToCart, (state, action) => {
      const { item } = action.payload;
      state.cartItems.push(item);
    })
})
