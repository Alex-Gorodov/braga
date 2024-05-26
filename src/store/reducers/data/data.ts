import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../../types/state";
import { addItemToCart, loadBeers, loadCart, setBeersDataLoadingStatus } from "../../actions";

const initialState: DataState = {
  beers: [],
  isBeersDataLoading: false,
  cartItems: [],
  isCartDataLoading: false,
}

export const dataReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(loadBeers, (state, action) => {
    state.beers = action.payload.beers;
  })
  .addCase(setBeersDataLoadingStatus, (state, action) => {
    state.isBeersDataLoading = action.payload.isBeersDataLoading;
  })
  .addCase(loadCart, (state, action) => {
    state.cartItems = action.payload.beers;
  })
  .addCase(addItemToCart, (state, action) => {
    const { item } = action.payload;
    state.cartItems.push(item);
  })
})
