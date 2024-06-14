import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { CartItem } from '../cart-item/cart-item';
import { useGetUser } from '../../hooks/useGetUser';

type CartBlockProps = {
  className: string;
};

const CartBlock = forwardRef<HTMLDivElement, CartBlockProps>((props, ref) => {
  const activeUser = useGetUser();
  const cartItems = useSelector((state: RootState) => state.data.users.find((user) => user.id === activeUser?.id)?.cartItems);
  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.amount, 0);

  return (
    <div className={props.className} ref={ref}>
      <h2 className="cart__title">My cart</h2>
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
          <Link className="button" to={AppRoute.Cart}>Checkout</Link>
        </>
        :
        <p>No products in the cart.</p>
      }
    </div>
  );
});

export default CartBlock;
