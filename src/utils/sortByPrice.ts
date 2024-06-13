import { Beer } from "../types/beer";

export function sortByPrice(beers: Beer[]): Beer[] {
  return beers.slice().sort((a, b) => b.price - a.price);
}

export function sortByPriceReverse(beers: Beer[]): Beer[] {
  return beers.slice().sort((a, b) => a.price - b.price);
}
