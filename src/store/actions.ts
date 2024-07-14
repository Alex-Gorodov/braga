import { AppRoute, AuthorizationStatus, BeerStatus, ErrorMessages, SuccessMessages } from "../const";
import { UserAuthData } from "../types/user-auth-data";
import { Guest, Subscriber } from "../types/guest";
import { Beer, BeerInCart } from "../types/beer";
import { createAction } from "@reduxjs/toolkit";
import { RootState } from "./root-reducer";
import { Review } from "../types/review";
import { User } from "../types/user";
import { Post } from "../types/post";


// Page setters
export const setStatusMessage = createAction<{message: ErrorMessages | SuccessMessages | null}>('page/setStatusMessage');
export const setUploadedPath = createAction<{ path: string | null }>('page/setUploadedPath');

// Page togglers
export const toggleGuestNotificationForm = createAction<{isOpened: boolean}>('page/toggleGuestNotificationForm');
export const toggleSignUpForm = createAction<{isOpened: boolean}>('page/toggleSignUpForm');
export const toggleSignInForm = createAction<{isOpened: boolean}>('page/toggleSignInForm');
export const toggleCart = createAction<{isCartOpened: boolean}>('page/toggleCart');

// Page others
export const getAuthedUser = createAction<{users: User[], id: string}>('page/getAuthedUser');
export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

// Data setters
export const setSubscribersDataLoadingStatus = createAction<{isSubscribersDataLoading: boolean}>('data/setSubscribersDataLoadingStatus');
export const setBlogPostsDataLoadingStatus = createAction<{isBlogPostsDataLoading: boolean}>('data/setBlogPostsDataLoadingStatus');
export const setReviewsDataLoadingStatus = createAction<{isReviewsDataLoading: boolean}>('data/setReviewsDataLoadingStatus');
export const setGuestsDataLoadingStatus = createAction<{isGuestsDataLoading: boolean}>('data/setGuestsDataLoadingStatus');
export const setBeersDataLoadingStatus = createAction<{isBeersDataLoading: boolean}>('data/setBeersDataLoadingStatus');
export const setUsersDataLoadingStatus = createAction<{isUsersDataLoading: boolean}>('data/setUsersDataLoadingStatus');
export const setBeerBrewingDate = createAction<{brewingDate: Date | null, beer: Beer}>('data/setBeerBrewingDate');

// Data loaders
export const loadSubscribers = createAction<{subscribersEmails: Subscriber[]}>('data/loadSubscribers');
export const loadReviews = createAction<{id: number; reviews: Review[]}>('data/loadReviews');
export const loadBlogPosts = createAction<{posts: Post[]}>('data/loadBlogPosts');
export const loadGuests = createAction<{guests: Guest[]}>('data/loadGuests');
export const loadBeers = createAction<{beers: Beer[]}>('data/loadBeers');
export const loadUsers = createAction<{users: User[]}>('data/loadUsers');

// Data updates
export const removeItemFromNotifications = createAction<{user: User, item: Beer}>('data/removeItemFromNotifications');
export const updateBeersAmount = createAction<{beerToUpdate: Beer, numToUpdate: number}>('data/updateBeersAmount');
export const removeItemFromPreOrder = createAction<{user: User, item: BeerInCart}>('data/removeItemFromPreOrder');
export const toggleBeerStatus = createAction<{beer: Beer, status: BeerStatus}>('data/toggleBeerStatus');
export const removeFromCart = createAction<{user: User, item: BeerInCart}>('data/removeFromCart');
export const deleteReview = createAction<{item: Beer, review: Review}>('data/deleteReview');

// Data adding
export const addItemToPreOrder = createAction<{user: User, item: BeerInCart, amount: number}>('data/addItemToPreOrder');
export const addItemToCart = createAction<{user: User, item: BeerInCart, amount: number}>('data/addItemToCart');
export const addItemToNotifications = createAction<{user: User, item: Beer}>('data/addItemToNotifications');
export const addGuestNotification = createAction<{guest: Guest, item: Beer}>('data/addGuestNotification');
export const addSubscriber = createAction<{subscriber: Subscriber}>('data/addSubscriber');
export const addReview = createAction<{item: Beer, review: Review}>('data/addReview');

// User
export const requireAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('user/requireAuthorization');
export const getUserInformation = createAction<{userInformation: UserAuthData | null}>('user/getUserInformation');
export const setUserInformation = createAction<{userInformation: UserAuthData}>('user/setUserInformation');

// Selectors
export const getReviewLoadingStatus = (state: RootState) => state.review.isReviewSending;
export const getUploadedPath = (state: RootState) => state.page.uploadedPath;
