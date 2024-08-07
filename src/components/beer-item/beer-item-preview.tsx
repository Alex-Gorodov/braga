import { addItemToUserDatabaseCart, addItemToUserPreOrder } from '../../store/api-actions';
import { addItemToCart, addItemToPreOrder, setStatusMessage } from "../../store/actions";
import { AppRoute, BeerStatus, ErrorMessages, SuccessMessages } from "../../const";
import { ReactComponent as CartIcon } from "../../img/icons/cart.svg";
import { ReactComponent as Preorder } from "../../img/icons/pre-order.svg";
import { Link, generatePath } from "react-router-dom";
import { Beer, BeerInCart } from "../../types/beer";
import { useGetUser } from "../../hooks/useGetUser";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Soon } from './soon';
import { Sold } from "./sold";
import cn from 'classnames';

type BeerItemProps = {
  item: Beer;
  showStatus: boolean;
  small?: boolean;
  className: string;
}

export function BeerItemPreview({ item, showStatus, small, className }: BeerItemProps): JSX.Element {
  const [isBtnShowed, setBtnShowed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToPreOrder, setIsAddingToPreOrder] = useState(false);

  const dispatch = useDispatch();

  const user = useGetUser();

  const itemButtonWrapperClassName = cn("button__wrapper", {
    "button__wrapper--active": isBtnShowed,
  });

  const itemButtonClassName = cn("button beer__cart-btn", {
    "button--small": small
  })

  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const handleAddToCart = async () => {
    if (!user || isAddingToCart) {
      dispatch(setStatusMessage({message: ErrorMessages.AddingToCartError}));
      return;
    }

    setIsAddingToCart(true);

    try {
      const itemInCart: BeerInCart = {
        ...item,
        amount: 1,
      };

      dispatch(addItemToCart({ user: user, item: itemInCart, amount: 1 }));
      dispatch(setStatusMessage({message: SuccessMessages.AddToCart}))
      await addItemToUserDatabaseCart(user, itemInCart);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToPreOrder = async () => {
    if (!user || isAddingToPreOrder) {
      dispatch(setStatusMessage({message: ErrorMessages.PreOrderError}))
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
      dispatch(setStatusMessage({message: SuccessMessages.AddToPreOrder}))
      await addItemToUserPreOrder(user, preOrderItem, 1);
    } finally {
      setIsAddingToPreOrder(false);
    }
  };

  return (
    <div
      className={`beer__item ${className}`}
      onMouseEnter={() => setBtnShowed(true)}
      onMouseLeave={() => setBtnShowed(false)}
      onTouchStart={() => setBtnShowed(!isBtnShowed)}
    >
      <div className={itemButtonWrapperClassName}>
        <Link className={itemButtonClassName} to={link}>Read more</Link>
      </div>
      <div className="beer__picture-wrapper">
        {
          item.onStock === 0 && showStatus && <Sold/>
        }
        {
          item.status !== BeerStatus.Unavailable && item.status !== BeerStatus.Ready && showStatus && <Soon beer={item}/>
        }
        <Link className='beer__picture-link' to={link}>
          <span className="visually-hidden">To {item.name} page.</span>
          <picture>
            <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={small ? 88 : 135} height={small ? 300 : 463}/>
            <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
            <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
            <img src={`${item.img}.png`} width={small ? 88 : 135} height={small ? 300 : 463} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
          </picture>
        </Link>
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
        {
          item.status === BeerStatus.Ready &&
          <button className="beer-item__btn" onClick={() => handleAddToCart()} title="Add to cart."><CartIcon/></button>
        }
        {
          (item.status === BeerStatus.Fermentation || item.status === BeerStatus.Maturation) &&
          <button className="beer-item__btn" onClick={() => handleAddToPreOrder()}><Preorder/></button>
        }
      </div>
    </div>
  );
}
