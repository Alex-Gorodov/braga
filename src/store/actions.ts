import { createAction } from "@reduxjs/toolkit";
import { Beer, BeerInCart } from "../types/beer";
import { AppRoute, AuthorizationStatus } from "../const";
import { Review } from "../types/review";
import { RootState } from "./root-reducer";
import { User } from "../types/user";
import { UserAuthData } from "../types/user-auth-data";
import { Guest, Subscriber } from "../types/guest";

export const setBeersDataLoadingStatus = createAction<{isBeersDataLoading: boolean}>('data/setBeersDataLoadingStatus');

export const loadBeers = createAction<{beers: Beer[]}>('data/loadBeers');

export const updateBeersAmount = createAction<{beerToUpdate: Beer, numToUpdate: number}>('data/updateBeersAmount');

export const toggleBeerOnBrewing = createAction<{beer: Beer, isOnBrewing: boolean}>('data/toggleBeerOnBrewing');

export const setUsersDataLoadingStatus = createAction<{isUsersDataLoading: boolean}>('data/setUsersDataLoadingStatus');

export const loadUsers = createAction<{users: User[]}>('data/loadUsers');

export const setGuestsDataLoadingStatus = createAction<{isGuestsDataLoading: boolean}>('data/setGuestsDataLoadingStatus');

export const loadGuests = createAction<{guests: Guest[]}>('data/loadGuests');

export const setSubscribersDataLoadingStatus = createAction<{isSubscribersDataLoading: boolean}>('data/setSubscribersDataLoadingStatus');

export const loadSubscribers = createAction<{subscribersEmails: Subscriber[]}>('data/loadSubscribers');

export const addItemToCart = createAction<{user: User, item: BeerInCart, amount: number}>('data/addItemToCart');

export const removeFromCart = createAction<{user: User, item: BeerInCart}>('data/removeFromCart');

export const requireAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('user/requireAuthorization');

export const setUserInformation = createAction<{userInformation: UserAuthData}>('user/setUserInformation');

export const toggleSignUpForm = createAction<{isOpened: boolean}>('page/toggleSignUpForm');

export const toggleSignInForm = createAction<{isOpened: boolean}>('page/toggleSignInForm');

export const toggleGuestNotificationForm = createAction<{isOpened: boolean}>('page/toggleGuestNotificationForm')

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

export const addReview = createAction<{item: Beer, review: Review}>('data/addReview');

export const deleteReview = createAction<{item: Beer, review: Review}>('data/deleteReview');

export const getAuthedUser = createAction<{users: User[], id: string}>('page/getAuthedUser');

export const loadReviews = createAction<{id: number; reviews: Review[]}>('data/loadReviews');

export const setReviewsDataLoadingStatus = createAction<{isReviewsDataLoading: boolean}>('data/setReviewsDataLoadingStatus');

export const getReviewLoadingStatus = (state: RootState) => state.review.isReviewSending;

export const setUploadedPath = createAction<{ path: string | null }>('page/setUploadedPath');

export const getUploadedPath = (state: RootState) => state.page.uploadedPath;

export const getUserInformation = createAction<{userInformation: UserAuthData | null}>('user/getUserInformation');

export const addItemToPreOrder = createAction<{user: User, item: BeerInCart, amount: number}>('data/addItemToPreOrder');

export const removeItemFromPreOrder = createAction<{user: User, item: BeerInCart}>('data/removeItemFromPreOrder');

export const addItemToNotifications = createAction<{user: User, item: Beer}>('data/addItemToNotifications');

export const removeItemFromNotifications = createAction<{user: User, item: Beer}>('data/removeItemFromNotifications');

export const addGuestNotification = createAction<{guest: Guest, item: Beer}>('data/addGuestNotification')

export const addSubscriber = createAction<{subscriber: Subscriber}>('data/addSubscriber');
