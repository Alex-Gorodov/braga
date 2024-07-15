import { ReactComponent as Cross} from "../../img/icons/cross.svg"
import { addItemToUserDatabaseCart, removeItemFromUserCart } from "../../store/api-actions";
import { addItemToCart, removeFromCart, setStatusMessage } from "../../store/actions";
import { useGetUser } from "../../hooks/useGetUser";
import { BeerInCart } from "../../types/beer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useState } from "react";
import { StatusMessage } from "../status-message/status-message";
import { ErrorMessages } from "../../const";

type CartItemProps = {
  item: BeerInCart;
}

export function CartItem({item}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();

  const beers = useSelector((state: RootState) => state.data.beers);

  const user = useGetUser()
  const handleRemoveItem = () => {
    user && dispatch(removeFromCart({user, item}))
    user && removeItemFromUserCart(user, item)
  }

  // const [isAddingToCart, setIsAddingToCart] = useState(false);

  // const handleMinus = () => {
  //   if (user?.cartItems.includes(item)) {
  //     setIsAddingToCart(true);
  //     const itemInCart = user.cartItems.find(cartItem => cartItem.id === item.id);

  //     if (itemInCart && itemInCart.amount > 1) {
  //       user && dispatch(addItemToCart({ user: user, item: item, amount: -1 }));
  //       user && addItemToUserDatabaseCart(user, item, -1);
  //     } else {
  //       user && dispatch(removeFromCart({ user: user, item: item }));
  //       user && removeItemFromUserCart(user, item);
  //     }
  //   }
  // }

  // const handlePlus = () => {
  //   if (user?.cartItems.includes(item)) {
  //     setIsAddingToCart(true);
  //     user && dispatch(addItemToCart({ user: user, item: item, amount: 1 }));
  //     user && addItemToUserDatabaseCart(user, item, 1);
  //   }
  //   if (item.amount === beers[item.id].onStock - 1) dispatch(setStatusMessage({
  //     message: ErrorMessages.LimitError
  //   }));
  // }


  const [isAddingToCart, setIsAddingToCart] = useState(false);

const handleMinus = async () => {
  if (!user || !user.cartItems.includes(item) || isAddingToCart) return;
  setIsAddingToCart(true);

  const itemInCart = user.cartItems.find(cartItem => cartItem.id === item.id);

  if (itemInCart && itemInCart.amount > 1) {
    try {
      user && dispatch(addItemToCart({ user: user, item: item, amount: -1 }));
      user && await addItemToUserDatabaseCart(user, item, -1);
    } finally {
      setIsAddingToCart(false);
    }
  } else {
    try {
      user && dispatch(removeFromCart({ user: user, item: item }));
      user && await removeItemFromUserCart(user, item);
    } finally {
      setIsAddingToCart(false);
    }
  }
};

const handlePlus = async () => {
  if (!user || !user.cartItems.includes(item) || isAddingToCart) return;
  setIsAddingToCart(true);

  try {
    user && dispatch(addItemToCart({ user: user, item: item, amount: 1 }));
    user && await addItemToUserDatabaseCart(user, item, 1);
    if (item.amount === beers[item.id].onStock - 1) {
      dispatch(setStatusMessage({ message: ErrorMessages.LimitError }));
    }
  } finally {
    setIsAddingToCart(false);
  }
};


  return (
    <li className="cart__item cart-item" key={`cart-${item.name}`}>
      <div className="cart-item__image-wrapper">
        <img
          className="cart-item__image"
          src={`${item.img}.png`}
          width={38}
          height={130}
          alt={item.name}
        />
      </div>
      <div className="cart-item__wrapper">
        <span className="cart-item__text cart-item__name">{item.name}</span>
        <span className="cart-item__text cart-item__amount">
          {item.amount} x {item.amount >= 6 ? <span className="cart-item__discounted-price">₪{(item.price * 0.9).toFixed(2)}</span> : <span>₪{item.price}</span>}
        </span>
        <button className="cart-item__remove-btn" onClick={handleRemoveItem} type="button">
          <Cross/>
          <span className="visually-hidden">Remove from cart</span>
        </button>
        <div className="cart-item__change-count-wrapper">
          <button className="button button--no-shadow cart-item__change-count-btn" onClick={() => handleMinus()} disabled={item.amount === 0}>-</button>
          <button className="button button--no-shadow cart-item__change-count-btn" onClick={() => handlePlus()} disabled={item.amount === beers[item.id].onStock}>+</button>
        </div>
      </div>
    </li>
  )
}
