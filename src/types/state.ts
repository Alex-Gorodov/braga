import { store } from "../store";
import { Beer } from "./beer";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type PageState = {
  isCartopened: boolean;
  cartItems: Beer[];
}
