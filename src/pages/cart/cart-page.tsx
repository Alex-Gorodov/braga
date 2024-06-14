import { Layout } from "../../components/layout/layout";
import { RootState } from "../../store/root-reducer";
import { Spinner } from "../../components/spinner/spinner";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { CartItem } from "../../components/cart-item/cart-item";

export function CartPage(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.data.cartItems)
  const isCartLoading = useSelector((state: RootState) => state.data.isCartDataLoading);

  return (
    <Layout>
      <Helmet>
        <title>Braga | Cart</title>
      </Helmet>
      <div>
        {
          isCartLoading ? <Spinner size={"40"} wrapper/> :
          cartItems.map((item) => {
            return (
              <CartItem item={item} key={`${item.name}`}/>
            )
          })
        }
      </div>
    </Layout>
  )
}
