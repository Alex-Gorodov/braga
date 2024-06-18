import { RootState } from "../../store/root-reducer";
import { useGetUser } from "../../hooks/useGetUser";
import { CartItem } from "../cart-item/cart-item";
import { Spinner } from "../spinner/spinner";
import { useSelector } from "react-redux";

export function CartPageItem(): JSX.Element {
  const isBeersLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const user = useGetUser();

  return (
    <section className="section section--cart">
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
        user?.cartItems.length
        ?
        <button className="button">Checkout</button>
        :
        <p>No items in cart</p>
      }
    </section>
  )
}
