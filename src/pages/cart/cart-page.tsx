import { Layout } from "../../components/layout/layout";
import { RootState } from "../../store/root-reducer";
import { Spinner } from "../../components/spinner/spinner";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { CartItem } from "../../components/cart-item/cart-item";

export function CartPage(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.data.cartItems)
  // const [isLoading, setIsLoading] = useState(true);
  // if (isLoading) {
  //   return <Spinner size={"40"}/>
  // }
  
  return (
    <Layout>
      <Helmet>
        <title>Braga | Cart</title>
      </Helmet>
      <div>
        {
          cartItems.map((item) => {
            return (
              <CartItem item={item}/>
            )
          })
        }
      </div>
    </Layout>
  )
}
