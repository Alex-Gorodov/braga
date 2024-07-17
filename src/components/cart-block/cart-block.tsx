import { ReactComponent as Cross } from '../../img/icons/cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { useGetUser } from '../../hooks/useGetUser';
import { CartItem } from '../cart-item/cart-item';
import { toggleCart } from '../../store/actions';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { forwardRef } from 'react';
import cn from 'classnames';

const CartBlock = forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state: RootState) => state.page.isCartOpened)

  const cartClassName = cn('cart', {
    'cart--opened': isCartOpened
  })

  const activeUser = useGetUser();
  const cartItems = useSelector((state: RootState) => state.data.users.find((user) => user.id === activeUser?.id)?.cartItems);

  const totalItems = cartItems?.reduce((acc, item) => acc + item.amount, 0);
  const hasItemWithAmountSixOrMore = cartItems?.some(item => item.amount >= 6);

  const totalPrice = cartItems?.reduce((acc, item) =>
    acc + (item.amount >= 6 ? item.price * 0.9 : item.price) * item.amount,
    0
  );

  const finalTotalPrice = totalItems && totalItems >= 6 && !hasItemWithAmountSixOrMore
    ? totalPrice && totalPrice * 0.9
    : totalPrice;

  const isTotalPriceDiscounted = finalTotalPrice !== totalPrice;

  return (
    <div className={cartClassName} ref={ref}>
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
            <span>{
              isTotalPriceDiscounted
                ? <>
                    <span className="cart-item__old-price">₪{totalPrice?.toFixed(2)}</span>&nbsp;
                    <span className="cart-item__discounted-price">₪{finalTotalPrice?.toFixed(2)}</span>
                  </>
                : <>
                  <span>₪{finalTotalPrice?.toFixed(2)}</span>
                </>
            }</span>

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
