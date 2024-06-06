import { Beer } from "./beer";
import { User } from "./user"

export type Review = {
  review: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type ReviewFormData = {
  beer: Beer;
  user: User;
  review: string;
  rating: number;
  id: number;
};
