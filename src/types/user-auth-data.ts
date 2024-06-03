import { BeerInCart, Beer } from "./beer";

export type UserAuthData = {
  name: string,
  surname: string,
  email: string,
  token: string;
  phone: number,
  password: string,
  isAdmin: boolean,
  cartItems: BeerInCart[],
  subscriptions: Beer[],
  liked: Beer[],
  avatar: string
};
