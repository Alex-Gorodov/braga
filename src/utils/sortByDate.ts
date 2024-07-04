import { Beer } from "../types/beer";

export function sortByDate(beers: Beer[]): Beer[] {

  return beers.slice().sort((a, b) => {
    if (a.brewingDate && b.brewingDate) {
      const aDate = new Date(a.brewingDate).getTime();
      const bDate = new Date(b.brewingDate).getTime();
      return bDate - aDate;
    }
    if (!a.brewingDate && b.brewingDate) {
      return 1;
    }
    if (a.brewingDate && !b.brewingDate) {
      return -1;
    }
    return 0;
  });

}
