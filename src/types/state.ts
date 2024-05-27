import { AuthorizationStatus } from "../const";
import { store } from "../store";
import { Beer, BeerInCart } from "./beer";
import { UserAuthData } from "./user-auth-data";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  beers: Beer[];
  isBeersDataLoading: boolean;
  cartItems: BeerInCart[];
  isCartDataLoading: boolean,
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserAuthData | null;
};
