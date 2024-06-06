import { AuthorizationStatus } from "../const";
import { store } from "../store";
import { Beer, BeerInCart } from "./beer";
import { Review } from "./review";
import { User } from "./user";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  beers: Beer[];
  users: User[];
  isBeersDataLoading: boolean;
  cartItems: BeerInCart[];
  isCartDataLoading: boolean,
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: User | null;
};

export type PageState = {
  uploadedNftPath: string | null,
  isSignInFormOpened: boolean;
  isSignUpFormOpened: boolean;
}

export type ReviewState = {
  reviews: Record<string, Review[]>;
  reviewsList: Review[];
  isReviewSending: boolean;
};
