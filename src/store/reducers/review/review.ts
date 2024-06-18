import { loadReviews, setReviewsDataLoadingStatus } from "../../actions";
import { ReviewState } from "../../../types/state";
import { createReducer } from "@reduxjs/toolkit";

const initialState: ReviewState = {
  reviews: {},
  reviewsList: [],
  isReviewSending: false,
};

export const reviewReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state: ReviewState, action) => {
      const {id, reviews} = action.payload;
      state.reviews[id] = reviews;
    })
    .addCase(setReviewsDataLoadingStatus, (state: ReviewState, action) => {
      const { isReviewsDataLoading } = action.payload;
      state.isReviewSending = isReviewsDataLoading;
    });
})
