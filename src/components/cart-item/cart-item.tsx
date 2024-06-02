import { useDispatch } from "react-redux";
import { ReactComponent as Cross} from "../../img/icons/cross.svg"
import { BeerInCart } from "../../types/beer";
import { removeFromCart } from "../../store/actions";
import { removeItemFromDatabaseCart } from "../../store/api-actions";

type CartItemProps = {
  item: BeerInCart;
}

export function CartItem({item}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeFromCart({item}))
    removeItemFromDatabaseCart(item);
  }
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
          {item.amount} x ₪{item.price}
        </span>
        <button className="cart-item__remove-btn" onClick={handleRemoveItem}>
          <Cross/>
          <span className="visually-hidden">Remove from cart</span>
        </button>
      </div>
    </li>
  )
}
