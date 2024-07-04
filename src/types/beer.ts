import { BeerStatus } from "../const";
import { Review } from "./review";

export type Beer = {
  id: number;
  name: string;
  style: string;
  description: string;
  categories: string[];
  price: number;
  img: string;
  previewImg: string;
  onStock: number;
  // onBrewing: boolean;
  status:BeerStatus;
  reviews: Review[];
  abv: number;
  ibu: number;
  srm: number;
  calories: number;
  brewingDate?: Date;
  brewingTimeDays?: number;
}

export type BeerInCart = Beer & {
  amount: number;
}
