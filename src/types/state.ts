import { AuthorizationStatus, ErrorMessages, SuccessMessages } from "../const";
import { UserAuthData } from "./user-auth-data";
import { Guest, Subscriber } from "./guest";
import { Review } from "./review";
import { store } from "../store";
import { Beer } from "./beer";
import { User } from "./user";
import { Post } from "./post";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  isSubscribersDataLoading: boolean;
  isBlogPostsDataLoading: boolean;
  isGuestsDataLoading: boolean;
  isBeersDataLoading: boolean;
  isUsersDataLoading: boolean;
  subscribers: Subscriber[];
  guests: Guest[];
  beers: Beer[];
  users: User[];
  blog: Post[];
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserAuthData | null;
};

export type PageState = {
  statusMessage: ErrorMessages | SuccessMessages | null;
  isGuestNotificationFormOpened: boolean;
  isSignInFormOpened: boolean;
  isSignUpFormOpened: boolean;
  isCartOpened: boolean;
  uploadedPath: string;
}

export type ReviewState = {
  reviews: Record<string, Review[]>;
  isReviewSending: boolean;
  reviewsList: Review[];
};
