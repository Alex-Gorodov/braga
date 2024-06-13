import { Beer } from "../types/beer";

function getBeerRating(beer: Beer) {
  const sumOfRatings = beer.reviews?.map((r) => r.rating).reduce((acc, rating) => acc + rating, 0);
  const reviews = beer.reviews?.length;

  return isNaN(sumOfRatings / reviews) ? Number((Math.random() * 10).toFixed(2)) : sumOfRatings / reviews;
}

export function sortByRating(beers: Beer[]): Beer[] {
  return beers.slice().sort((a, b) => getBeerRating(b) - getBeerRating(a))
}
