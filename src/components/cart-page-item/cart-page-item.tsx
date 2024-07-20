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
  const activeUser = useGetUser();

  const cartItems = useSelector((state: RootState) => state.data.users.find((user) => user.id === activeUser?.id)?.cartItems);

  const totalItems = cartItems?.reduce((acc, item) => acc + item.amount, 0);
  // const hasItemWithAmountSixOrMore = cartItems?.some(item => item.amount >= 6);

  const totalPrice = cartItems?.reduce((acc, item) =>
    acc + (item.amount >= 6 ? item.price * 0.9 : item.price) * item.amount,
    0
  );

  const finalTotalPrice = totalItems && totalItems >= 6
    ? totalPrice && totalPrice * 0.9
    : totalPrice;

  const isTotalPriceDiscounted = finalTotalPrice !== totalPrice;

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
        user?.cartItems?.length ? <p className="checkout__total">
          <span>Total: </span>
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
        </p> : ''
      }
      {
        user?.cartItems?.length
        ?
        <button className="button checkout__btn" onClick={() => setCheckoutOpened(!isCheckoutOpened)}>Checkout</button>
        :
        <p>No items in cart</p>
      }
      {
        isCheckoutOpened &&
        <div className="checkout__popup-wrapper" ref={paymentRef}>
          <div className="checkout__popup">
            <h3 className="title title--3 checkout__title">Payment methods:</h3>
            <button className="checkout__close-btn" onClick={() => setCheckoutOpened(!isCheckoutOpened)}>
              <Cross/>
              <span className="visually-hidden">Close payments window</span>
            </button>
            <div className="checkout__payment-method">
              <BitIcon/>
              <p className="checkout__payment-data">0543955573</p>
              <button className="checkout__copy-btn" onClick={() => copyToClipboard('0543955573')} title="Copy to clipboard">
                <Copy/>
                <span className="visually-hidden">copy bit data to clipboard</span>
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  )
}
