import { ReactComponent as Cross} from "../../img/icons/cross.svg"
import { removeItemFromUserCart } from "../../store/api-actions";
import { removeFromCart } from "../../store/actions";
import { useGetUser } from "../../hooks/useGetUser";
import { BeerInCart } from "../../types/beer";
import { useDispatch } from "react-redux";

type CartItemProps = {
  item: BeerInCart;
}

export function CartItem({item}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();

  const user = useGetUser()
  const handleRemoveItem = () => {
    user && dispatch(removeFromCart({user, item}))
    user && removeItemFromUserCart(user, item)
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
          {item.amount} x ₪{item.amount >= 6 ? (item.price * 0.9).toFixed(2) : item.price}
        </span>
        <button className="cart-item__remove-btn" onClick={handleRemoveItem} type="button">
          <Cross/>
          <span className="visually-hidden">Remove from cart</span>
        </button>
      </div>
    </li>
  )
}
