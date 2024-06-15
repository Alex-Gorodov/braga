import { Layout } from "../../components/layout/layout";
import { RootState } from "../../store/root-reducer";
import { Spinner } from "../../components/spinner/spinner";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { CartItem } from "../../components/cart-item/cart-item";
import { useGetUser } from "../../hooks/useGetUser";

export function CartPage(): JSX.Element {
  const isBeersLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const user = useGetUser();

  return (
    <Layout>
      <Helmet>
        <title>Braga | Cart</title>
      </Helmet>
      <div>
        {
          isBeersLoading ? <Spinner size={"40"} wrapper/> :
          user?.cartItems.map((item) => {
            return (
              <CartItem item={item} key={`${item.name}`}/>
            )
          })
        }
      </div>
    </Layout>
  )
}
