import { store } from "../store";
import { Beer, BeerInCart } from "./beer";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  beers: Beer[];
  isBeersDataLoading: boolean;
  cartItems: BeerInCart[];
  isCartDataLoading: boolean,
}

export type PageState = {
  isCartopened: boolean;
}
