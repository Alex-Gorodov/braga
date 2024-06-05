import { User } from "./user"

export type Review = {
  review: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};
