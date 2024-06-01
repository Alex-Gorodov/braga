export type Beer = {
  id: number;
  name: string;
  style: string;
  description: string;
  categories: string[];
  price: number;
  img: string;
  onStock: number;
  onBrewing?: boolean;
}

export type BeerInCart = Beer & {
  amount: number;
}
