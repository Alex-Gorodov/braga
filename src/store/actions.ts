import { createAction } from "@reduxjs/toolkit";
import { Beer, BeerInCart } from "../types/beer";
import { AppRoute, AuthorizationStatus } from "../const";
import { Review } from "../types/review";
import { RootState } from "./root-reducer";
import { User } from "../types/user";
import { UserAuthData } from "../types/user-auth-data";

export const setBeersDataLoadingStatus = createAction<{isBeersDataLoading: boolean}>('data/setBeersDataLoadingStatus');

export const loadBeers = createAction<{beers: Beer[]}>('data/loadBeers');

export const setCartDataLoadingStatus = createAction<{isCartDataLoading: boolean}>('data/setCartDataLoadingStatus');

export const loadCart = createAction<{beers: BeerInCart[]}>('data/loadCart');

export const addItemToCart = createAction<{item: BeerInCart, amount: number}>('data/addItemToCart');

export const removeFromCart = createAction<{item: BeerInCart}>('data/removeFromCart');

export const requireAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('user/requireAuthorization');

export const setUserInformation = createAction<{userInformation: UserAuthData}>('user/setUserInformation');

export const setUsersDataLoadingStatus = createAction<{isUsersDataLoading: boolean}>('data/setUsersDataLoadingStatus');

export const loadUsers = createAction<{users: User[]}>('data/loadUsers');

export const toggleSignUpForm = createAction<{isOpened: boolean}>('page/toggleSignUpForm');

export const toggleSignInForm = createAction<{isOpened: boolean}>('page/toggleSignInForm');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

export const addReview = createAction<{item: Beer, review: Review}>('data/addReview');

export const deleteReview = createAction<{item: Beer, review: Review}>('data/deleteReview');

export const getAuthedUser = createAction<{users: User[], id: string}>('page/getAuthedUser');

export const loadReviews = createAction<{id: number; reviews: Review[]}>('data/loadReviews');

export const setReviewsDataLoadingStatus = createAction<{isReviewsDataLoading: boolean}>('data/setReviewsDataLoadingStatus');

export const getReviewLoadingStatus = (state: RootState) => state.review.isReviewSending;

export const setUploadedPath = createAction<{ path: string | null }>('page/setUploadedPath');

export const getUserInformation = createAction<{userInformation: UserAuthData | null}>('user/getUserInformation');

export const addItemToPreOrder = createAction<{user: User, item: BeerInCart}>('data/addItemToPreOrder');
