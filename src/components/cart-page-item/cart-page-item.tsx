import { ReactComponent as BitIcon } from "../../img/icons/bit.svg";
import { ReactComponent as Cross } from "../../img/icons/cross.svg";
import { ReactComponent as Copy } from "../../img/icons/copy-to-clipboard.svg";
import { RootState } from "../../store/root-reducer";
import { useGetUser } from "../../hooks/useGetUser";
import { CartItem } from "../cart-item/cart-item";
import { Spinner } from "../spinner/spinner";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setStatusMessage } from "../../store/actions";
import { SuccessMessages } from "../../const";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export function CartPageItem(): JSX.Element {
  const isBeersLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const user = useGetUser();
  const dispatch = useDispatch();

  const totalPrice = user?.cartItems?.reduce((acc, item) =>
    acc + (item.amount >= 6 ? Number((item.price * 0.9).toFixed(1)) : item.price) * item.amount,
    0
  );

  const [isCheckoutOpened, setCheckoutOpened] = useState(false);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      dispatch(setStatusMessage({message: SuccessMessages.CopiedToClipboard}))
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  const paymentRef = useOutsideClick(() => {
    setCheckoutOpened(false);
  }) as React.RefObject<HTMLDivElement>;

  return (
    <section className="section section--cart checkout">
      <h1 className="visually-hidden">Cart page</h1>
      <h2 className="title title--2">My cart</h2>
      <ul className="cart__list cart__list--page">
        {
          isBeersLoading ? <Spinner size={"40"} wrapper/> :
          user?.cartItems?.map((item) => {
            return (
              <CartItem item={item} key={`${item.name}`}/>
            )
          })
        }
      </ul>
      {
        user?.cartItems.length ? <p>Total: ₪ {totalPrice?.toFixed(2)}</p> : ''
      }
      {
        user?.cartItems.length
        ?
        <button className="button" onClick={() => setCheckoutOpened(!isCheckoutOpened)}>Checkout</button>
        :
        <p>No items in cart</p>
      }
      {
        isCheckoutOpened &&
        <div className="checkout__popup-wrapper" ref={paymentRef}>
          <h3 className="title title--3">Payment methods:</h3>
          <div className="checkout__popup">
            <button className="checkout__close-btn" onClick={() => setCheckoutOpened(!isCheckoutOpened)}>
              <Cross/>
            </button>
            <BitIcon/>
            <p>0543955573</p>
            <button className="checkout__copy-btn" onClick={() => copyToClipboard('0543955573')}>
              <Copy/>
            </button>
          </div>
        </div>
      }
    </section>
  )
}
