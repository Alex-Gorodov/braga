import { Beer } from "../types/beer";

function getBeerPopularity(beer: Beer) {
  const sumOfRatings = beer.reviews?.map((r) => r.rating).reduce((acc, rating) => acc + rating, 0);
  const reviews = beer.reviews?.length;
  const rating = sumOfRatings / reviews;

  return isNaN(rating + reviews) ? Number((Math.random() * 10).toFixed(2)) : rating + reviews;
}

export function sortByPopularity(beers: Beer[]): Beer[] {
  return beers.slice().sort((a, b) => getBeerPopularity(b) - getBeerPopularity(a))
}
