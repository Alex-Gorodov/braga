import { AuthorizationStatus } from "../const";
import { UserAuthData } from "./user-auth-data";
import { Guest, Subscriber } from "./guest";
import { Review } from "./review";
import { store } from "../store";
import { Beer } from "./beer";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  beers: Beer[];
  users: User[];
  guests: Guest[];
  isBeersDataLoading: boolean;
  subscribers: Subscriber[];
  isUsersDataLoading: boolean;
  isGuestsDataLoading: boolean;
  isSubscribersDataLoading: boolean;
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserAuthData | null;
};

export type PageState = {
  uploadedPath: string,
  isSignInFormOpened: boolean;
  isSignUpFormOpened: boolean;
  isGuestNotificationFormOpened: boolean;
  isCartOpened: boolean;
}

export type ReviewState = {
  reviews: Record<string, Review[]>;
  reviewsList: Review[];
  isReviewSending: boolean;
};
