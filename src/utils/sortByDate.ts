import { Beer } from "../types/beer";

export function sortByDate(beers: Beer[]): Beer[] {
  // return beers.slice().sort((a,b) => b.brewingDate && a.brewingDate ? b.brewingDate.getTime() - a.brewingDate.getTime() : beers);
  return beers.slice().sort((a, b) => {
    if (a.brewingDate && b.brewingDate) {
      const aDate = new Date(a.brewingDate).getTime();
      const bDate = new Date(b.brewingDate).getTime();
      return bDate - aDate;
    }
    // You can adjust the fallback to handle cases where brewingDate is missing
    // For example, treat undefined dates as the oldest
    if (!a.brewingDate && b.brewingDate) {
      return 1; // a should come after b
    }
    if (a.brewingDate && !b.brewingDate) {
      return -1; // a should come before b
    }
    return 0; // if both dates are undefined or any other fallback logic
  });

}
