import { Link, generatePath, useLocation } from "react-router-dom";
import { addItemToCart } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Beer, BeerInCart } from "../../types/beer";
import { AppRoute } from "../../const";
import { useState } from "react";
import cn from 'classnames';
import { RootState } from '../../store/root-reducer';
import { addItemToUserDatabaseCart } from '../../store/api-actions';
import { Soon } from './soon';
import { Sold } from "./sold";
import { useGetUser } from "../../hooks/useGetUser";

type BeerItemProps = {
  item: Beer;
  showStatus: boolean;
  small?: boolean;
  className: string;
}

export function BeerItemPreview({ item, showStatus, small, className }: BeerItemProps): JSX.Element {
  const [isCartBtnShown, setCartBtnShown] = useState(false);
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useGetUser();

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
    user && dispatch(addItemToCart({ user: user, item: itemInCart, amount: 1 }));
    user && addItemToUserDatabaseCart(user, itemInCart)
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
          ''
          :
          !location.pathname.includes(AppRoute.Shop)
            ?
              item.onStock === 0
              ?
                item.onBrewing
                ?
                  <div className={itemButtonWrapperClassName}>
                    <button className={itemButtonClassName} type="button">Pre-order</button>
                  </div>
                :
                  <div className={itemButtonWrapperClassName}>
                    <Link className={itemButtonClassName} to={link}>Read more</Link>
                  </div>
              :
                <div className={itemButtonWrapperClassName}>
                  <button className={itemButtonClassName} onClick={handleAddToCart} type="button">Add to cart</button>
                </div>
           : ''
      }
      <div className="beer__picture-wrapper">
        {
          item.onStock === 0 && showStatus && <Sold/>
        }
        {
          item.onStock === 0 && item.onBrewing && showStatus && <Soon/>
        }
        {
          small ?
          <Link className='beer__picture-link' to={link}>
            <picture>
              <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={small ? 88 : 135} height={small ? 300 : 463}/>
              <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
              <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
              <img src={`${item.img}.png`} width={small ? 88 : 135} height={small ? 300 : 463} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
            </picture>
          </Link>
          :
          <picture>
            <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={small ? 88 : 135} height={small ? 300 : 463}/>
            <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
            <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
            <img src={`${item.img}.png`} width={small ? 88 : 135} height={small ? 300 : 463} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
          </picture>

        }
      </div>
      <div className='beer__item-wrapper'>
        <Link className="beer__item-name beer__item-accent" to={link}>
          {item.name}
        </Link>
        <p className='beer__item-style'>
          {item.style}
        </p>
        <p className="beer__item-categories">
          {item.categories.map((c, index) => (
            index < item.categories.length - 1 ? `${c}, ` : c
          ))}
        </p>
        <p className="beer__item-price beer__item-accent">
          <span>
            ₪
          </span>
          <span>
            {item.price}
          </span>
        </p>
      </div>
    </div>
  );
}
