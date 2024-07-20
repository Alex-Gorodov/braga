import { Beer, BeerInCart } from "./beer"
import { Post } from "./post";

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
  notifications: Beer[],
  preOrder: BeerInCart[],
  liked: Post[],
  avatar: string
};

export type RegisterUser = User & {
  confirmPassword: string;
}
