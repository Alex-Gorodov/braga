import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { CartItem } from '../cart-item/cart-item';

type CartBlockProps = {
  cartClassName: string;
};

const CartBlock = forwardRef<HTMLDivElement, CartBlockProps>((props, ref) => {
  const cartItems = useSelector((state: RootState) => state.data.cartItems);

  return (
    <div className={props.cartClassName} ref={ref}>
      <h2 className="cart__title">My cart</h2>
      {
        cartItems.length
        ?
        <>
          <ul className="cart__list">
            {cartItems.map((item) => (
              <CartItem item={item} key={`${item.name}-in-cart`}/>
            ))}
          </ul>
          <p className="cart__total">
            <span>Total:</span>
            <span>₪{cartItems.map((item) => item.price * item.amount)}</span>
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
