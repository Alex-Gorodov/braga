import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { CartItem } from '../cart-item/cart-item';
import { useGetUser } from '../../hooks/useGetUser';
import { toggleCart } from '../../store/actions';
import { ReactComponent as Cross } from '../../img/icons/cross.svg';

type CartBlockProps = {
  className: string;
};

const CartBlock = forwardRef<HTMLDivElement, CartBlockProps>((props, ref) => {
  const activeUser = useGetUser();
  const cartItems = useSelector((state: RootState) => state.data.users.find((user) => user.id === activeUser?.id)?.cartItems);
  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.amount, 0);
  const dispatch = useDispatch();

  return (
    <div className={props.className} ref={ref}>
      <h2 className="cart__title">My cart</h2>
      <button className="cart__close-btn" onClick={() => dispatch(toggleCart({isCartOpened: false}))}>
        <Cross/>
      </button>
      {
        cartItems?.length
        ?
        <>
          <ul className="cart__list">
            {cartItems.map((item) => (
              <CartItem item={item} key={`${item.name}-in-cart`}/>
            ))}
          </ul>
          <p className="cart__total">
            <span>Total:</span>
            <span>₪{totalPrice}</span>
          </p>
          <Link className="button" to={AppRoute.Cart} onClick={() => {
            dispatch(toggleCart({isCartOpened: false}))
          }}>Checkout</Link>
        </>
        :
        <p>No products in the cart.</p>
      }
    </div>
  );
});

export default CartBlock;
