import { ReactComponent as StarIcon } from '../../img/icons/star.svg';
import { Link, generatePath, useLocation } from "react-router-dom";
import { addItemToCart } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Beer, BeerInCart } from "../../types/beer";
import { AppRoute } from "../../const";
import { useState } from "react";
import cn from 'classnames';
import { RootState } from '../../store/root-reducer';
import { addItemToDatabaseCart } from '../../store/api-actions';

type BeerItemProps = {
  item: Beer;
  showStatus: boolean;
  small?: boolean;
  className: string;
}

export function BeerItem({ item, showStatus, small, className }: BeerItemProps): JSX.Element {
  const [isCartBtnShown, setCartBtnShown] = useState(false);
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const dispatch = useDispatch();
  const location = useLocation();

  const itemButtonWrapperClassName = cn("button__wrapper", {
    "button__wrapper--active": isCartBtnShown,
  });

  const itemButtonClassName = cn("button beer__cart-btn", {
    "button--small": small
  })

  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const handleAddToCart = () => {
    const existingItem = cartItems.find((cartItem: BeerInCart) => cartItem && cartItem.id === item.id);

    const itemInCart: BeerInCart = {
      ...item,
      amount: existingItem ? existingItem.amount + 1 : 1,
    };
    dispatch(addItemToCart({ item: itemInCart }));
    addItemToDatabaseCart(itemInCart)
  };

  return (
    <div
      className={`beer__item item ${className}`}
      onMouseEnter = {() => setCartBtnShown(true)}
      onMouseLeave = {() => setCartBtnShown(false)}
      onTouchStart = {() => setCartBtnShown(!isCartBtnShown)}
    >
      {
        small
        ?
          <div className={itemButtonWrapperClassName}>
            <Link className={itemButtonClassName} to={link}>Read more</Link>
          </div>
          :
          !location.pathname.includes(AppRoute.Shop)
            ?
              item.onStock === 0
              ?
                item.onBrewing
                ?
                  <div className={itemButtonWrapperClassName}>
                    <button className={itemButtonClassName}>Pre-order</button>
                  </div>
                :
                  <div className={itemButtonWrapperClassName}>
                    <Link className={itemButtonClassName} to={link}>Read more</Link>
                  </div>
              :
                <div className={itemButtonWrapperClassName}>
                  <button className={itemButtonClassName} onClick={handleAddToCart}>Add to cart</button>
                </div>
           : ''
      }
      <div className="beer__picture-wrapper">
        {
          item.onStock === 0 && showStatus &&
            <div className="beer__label beer__label--sold">
              <StarIcon />
              <span>sold</span>
            </div>
        }
        {
          item.onStock === 0 && item.onBrewing && showStatus &&
            <div className="beer__label beer__label--soon">
              <StarIcon />
              <span>soon</span>
            </div>
        }
        <picture>
          <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={small ? 88 : 135} height={small ? 300 : 463}/>
          <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
          <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
          <img src={`${item.img}.png`} width={small ? 88 : 135} height={small ? 300 : 463} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
        </picture>
      </div>
      <div className='beer__item-wrapper'>
        <Link className="beer__item-name beer__item-accent" to={link}>
          {item.name}
        </Link>
        <p className="beer__item-categories">
          {item.categories.map((c, index) => (
            index < item.categories.length - 1 ? `${c}, ` : c
          ))}
        </p>
        <p className="beer__item-price beer__item-accent">
          ₪ {item.price}
        </p>
      </div>
    </div>
  );
}
