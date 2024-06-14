import { Link, generatePath } from "react-router-dom";
import { AppRoute, SHOP_SORTING, SortingNames } from "../../const";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useState, useEffect } from "react";
import { Beer } from "../../types/beer";
import { sortByPrice, sortByPriceReverse } from "../../utils/sortByPrice";
import { sortByPopularity } from "../../utils/sortByPopularity";
import { sortByRating } from "../../utils/sortByRating";
import { Spinner } from "../spinner/spinner";
import { Soon } from "../beer-item/soon";
import { Sold } from "../beer-item/sold";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export function Shop(): JSX.Element {
  const beers = useSelector((state: RootState) => state.data.beers);
  const isBeersLoaded = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const [isSortingOpened, setSortingOpened] = useState(false);
  const [sorting, setSorting] = useState(SortingNames.Default);
  const [initialBeers, setInitialBeers] = useState<Beer[]>([]);

  useEffect(() => {
    setInitialBeers(beers);
  }, [beers]);

  useEffect(() => {
    switch (sorting) {
      case SortingNames.Default:
        setInitialBeers(beers);
        break;
      case SortingNames.Price:
        setInitialBeers(sortByPrice([...beers]));
        break;
      case SortingNames.PriceReverse:
        setInitialBeers(sortByPriceReverse([...beers]));
        break;
      case SortingNames.Popular:
        setInitialBeers(sortByPopularity([...beers]));
        break;
      case SortingNames.Rating:
        setInitialBeers(sortByRating([...beers]));
        break;
      default:
        setInitialBeers(beers);
        break;
    }
  }, [sorting, beers]);

  const link = (item: Beer) => generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const sortRef = useOutsideClick(() => {
    setSortingOpened(false);
  }) as React.RefObject<HTMLUListElement>;

  return (
    <section className="section shop">
      <div className="shop__top-wrapper">
        <h2 className="title title--2">Shop</h2>
        <ul className="breadcrumbs shop__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>Home</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Shop}>Shop</Link>
          </li>
        </ul>
      </div>
      <div className="shop__content">
        <div className="shop__top-wrapper shop__top-wrapper--sort">
          <span className="shop__count">
            Show 1-6 of {beers.length} results
          </span>
          <div className="shop__sorting-wrapper">
            <span className="shop__sorting-item" onClick={() => setSortingOpened(!isSortingOpened)}>
              {SHOP_SORTING.find(item => item.name === sorting)?.value || sorting}
            </span>
            {isSortingOpened && (
              <ul className="shop__sorting-list">
                {SHOP_SORTING.map((item) => (
                  <li
                    className="shop__sorting-item"
                    key={`sorting-item-${item.value}`}
                    onClick={() => {
                      setSorting(item.name as SortingNames);
                      setSortingOpened(false);
                    }}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ul className="shop__items-list" ref={sortRef}>
          {
            !isBeersLoaded
            ?
            initialBeers.map((item) => (
              <li className="shop__item" key={`shop-item-${item.name}`}>
                <Link className="shop__item-link" to={link(item)}>
                  <div className="shop__item-img-wrapper">
                    <img src={`${item.img}.png`} alt={item.name} width={100} height={338}/>
                    {
                      item.onBrewing && <Soon cn="shop__item-label"/>
                    }
                    {
                      !item.onStock && !item.onBrewing && <Sold cn="shop__item-label"/>
                    }
                  </div>
                  <span className="beer__item-name">
                    {item.name}
                  </span>
                </Link>
                <span className="product__price">₪ {item.price}</span>
                <div>
                  {item.categories.map((i) => (
                    <span key={`${item.name}-category-${i}`}>
                      {`${i}${item.categories.indexOf(i) === item.categories.length - 1 ? '' : ', '}`}
                    </span>
                  ))}
                </div>
              </li>))
            :
            <Spinner wrapper size="40"/>
          }
        </ul>
      </div>
    </section>
  );
}
