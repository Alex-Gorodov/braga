import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../../types/state";
import { addItemToCart, addItemToPreOrder, addReview, deleteReview, loadBeers, loadCart, loadUsers, removeFromCart, setBeersDataLoadingStatus } from "../../actions";

const initialState: DataState = {
  beers: [],
  users: [],
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
  .addCase(loadUsers, (state, action) => {
    state.users = action.payload.users;
  })
  .addCase(addItemToCart, (state, action) => {
    const { item, amount } = action.payload;
    const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      state.cartItems[existingItemIndex].amount += amount;
    } else {
      state.cartItems.push({...item, amount});
    }
  })
  .addCase(removeFromCart, (state, action) => {
    const { item } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];

        if (existingItem.amount) {
          state.cartItems.splice(existingItemIndex, 1);
        }
      }
  })
  .addCase(addReview, (state, action) => {
    const { id } = action.payload.item;
    const { review } = action.payload;

    const index = state.beers.findIndex(beer => beer.id === id);

    if (index !== -1) {
        if (!state.beers[index].reviews) {
            state.beers[index].reviews = [];
        }
        state.beers[index].reviews.push(review);
    } else {
        console.error(`Beer with id ${id} not found`);
    }
  })
  .addCase(deleteReview, (state, action) => {
    const { id } = action.payload.review;
    const { review } = action.payload;

    state.beers[id].reviews = state.beers[id].reviews?.filter((reviewId) => reviewId.id !== review.id);
  })
  .addCase(addItemToPreOrder, (state, action) => {
    const { user, item } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind) {
      if (!userToFind.preOrder) {
        userToFind.preOrder = [];
      }

      const existingItemIndex = userToFind.preOrder.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        userToFind.preOrder[existingItemIndex].amount += item.amount;
      } else {
        userToFind.preOrder.push(item);
      }
    }
  });
})
