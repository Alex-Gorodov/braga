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
}

export function BeerItem({ item }: BeerItemProps): JSX.Element {
  const [isCartBtnShown, setCartBtnShown] = useState(false);
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const dispatch = useDispatch();
  const location = useLocation();

  const cartButtonClassName = cn("button__wrapper", {
    "button__wrapper--active": isCartBtnShown,
  });

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
      className="hero__swipe beer__item item"
      onMouseEnter = {() => setCartBtnShown(true)}
      onMouseLeave = {() => setCartBtnShown(false)}
      onTouchStart = {() => setCartBtnShown(!isCartBtnShown)}
    >
      <div className={cartButtonClassName}>
        {
          !location.pathname.includes(AppRoute.Shop)
            ?
            item.onStock === 0
              ?
              <Link className="button beer__cart-btn" to={link}>Read more</Link>
              :
              <button className="button beer__cart-btn" onClick={handleAddToCart}>Add to cart</button>
            : ''
        }
      </div>
      {
        item.onStock === 0 &&
        <div className="beer__sold">
          <StarIcon />
          <span>sold</span>
        </div>
      }
      <picture>
        <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={135} height={463}/>
        <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
        <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
        <img src={`${item.img}.png`} width={135} height={463} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
      </picture>
      <div className='beer__item-wrapper'>
        <div>
          <Link className="beer__item-name beer__item-accent" to={link}>
            {item.name}
          </Link>
          {item.categories.map((c, index) => (
            index < item.categories.length - 1 ? `${c}, ` : c
          ))}
        </div>
        <p className="beer__item-accent">
          ₪ {item.price}
        </p>
      </div>
    </div>
  );
}
