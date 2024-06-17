import { Link, generatePath } from "react-router-dom";
import { AppRoute, SHOP_SORTING, SortingNames } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useState, useEffect } from "react";
import { Beer, BeerInCart } from "../../types/beer";
import { sortByPrice, sortByPriceReverse } from "../../utils/sortByPrice";
import { sortByPopularity } from "../../utils/sortByPopularity";
import { sortByRating } from "../../utils/sortByRating";
import { Spinner } from "../spinner/spinner";
import { Soon } from "../beer-item/soon";
import { Sold } from "../beer-item/sold";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useGetUser } from "../../hooks/useGetUser";
import { addItemToCart, addItemToPreOrder } from "../../store/actions";
import { addItemToUserDatabaseCart, addItemToUserPreOrder } from "../../store/api-actions";
import cn from 'classnames';

export function Shop(): JSX.Element {
  const beers = useSelector((state: RootState) => state.data.beers);
  const isBeersLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const [isSortingOpened, setSortingOpened] = useState(false);
  const [sorting, setSorting] = useState(SortingNames.Default);
  const [initialBeers, setInitialBeers] = useState<Beer[]>([]);
  const user = useGetUser();
  const dispatch = useDispatch();

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

  const [isCartBtnShown, setCartBtnShown] = useState<{item: Beer | null, isButtonShowed: boolean}>({item: null, isButtonShowed: false});

  const sortRef = useOutsideClick(() => {
    setSortingOpened(false);
  }) as React.RefObject<HTMLUListElement>;

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToPreOrder, setIsAddingToPreOrder] = useState(false);

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
            !isBeersLoading
            ?
            initialBeers.map((item) => {

              const link = generatePath(AppRoute.ProductPage, {
                id: `${item.id}`,
              });

              const handleAddToCart = async () => {
                if (!user || isAddingToCart) {
                  console.error('User is undefined or already adding to cart');
                  return;
                }

                setIsAddingToCart(true);

                try {
                  const itemInCart: BeerInCart = {
                    ...item,
                    amount: 1,
                  };

                  dispatch(addItemToCart({ user: user, item: itemInCart, amount: 1 }));

                  await addItemToUserDatabaseCart(user, itemInCart);
                } finally {
                  setIsAddingToCart(false);
                }
              };

              const handleAddToPreOrder = async () => {
                if (!user || isAddingToPreOrder) {
                  console.error('User is undefined or already adding to pre-order');
                  return;
                }

                setIsAddingToPreOrder(true);

                try {
                  const preOrderItem: BeerInCart = {
                    ...item,
                    amount: 1,
                  };

                  dispatch(addItemToPreOrder({ user: user, item: preOrderItem, amount: 1 }));
                  await addItemToUserPreOrder(user, preOrderItem, 1);
                } finally {
                  setIsAddingToPreOrder(false);
                }
              };

              const itemButtonWrapperClassName = cn("button__wrapper", {
                "button__wrapper--active": isCartBtnShown.item === item,
              });

              return (
                <li
                  className="shop__item"
                  key={`shop-item-${item.name}`}
                  onMouseEnter={() => setCartBtnShown({item: item, isButtonShowed: true})}
                  onMouseLeave={() => setCartBtnShown({item: null, isButtonShowed: false})}
                  onTouchStart={() => setCartBtnShown({item: isCartBtnShown.isButtonShowed ? item : null, isButtonShowed: !isCartBtnShown.isButtonShowed})}
                >
                  <Link className="shop__item-link" to={link}>
                    <div className="shop__item-img-wrapper">
                      <img src={`${item.img}.png`} alt={item.name} width={100} height={338}/>
                      {
                        item.onStock === 0
                        ?
                          item.onBrewing && user
                          ?
                            <div className={itemButtonWrapperClassName}>
                              <button className="button beer__cart-btn" onClick={handleAddToPreOrder} type="button">Pre-order</button>
                            </div>
                          :
                            ''
                        :
                          <div className={itemButtonWrapperClassName}>
                            <button className="button beer__cart-btn" onClick={handleAddToCart} type="button">Add to cart</button>
                          </div>
                      }
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
                </li>
              )}
            )
            :
            <Spinner wrapper size="40"/>
          }
        </ul>
      </div>
    </section>
  );
}
