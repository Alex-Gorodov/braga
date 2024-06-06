import { Beer, BeerInCart } from "./beer"

export type User = {
  name: string,
  surname: string,
  email: string,
  phone: number,
  password: string,
  isAdmin: boolean,
  cartItems: BeerInCart[],
  subscriptions: Beer[],
  liked: Beer[],
  avatar: string,
};

export type RegisterUser = User & {
  confirmPassword: string;
}
