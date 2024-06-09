import { Beer, BeerInCart } from "./beer"

export type User = {
  id: string;
  name: string,
  surname: string,
  email: string,
  token: string;
  phone: string,
  password: string,
  isAdmin: boolean,
  cartItems: BeerInCart[],
  subscriptions: Beer[],
  liked: Beer[],
  avatar: string
};

export type RegisterUser = User & {
  confirmPassword: string;
}
