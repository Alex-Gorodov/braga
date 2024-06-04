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
  onBrewing?: boolean;
}

export type BeerInCart = Beer & {
  amount: number;
}
