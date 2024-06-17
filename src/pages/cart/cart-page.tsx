import { CartPageItem } from "../../components/cart-page-item/cart-page-item";
import { Layout } from "../../components/layout/layout";
import { Helmet } from "react-helmet-async";

export function CartPage(): JSX.Element {

  return (
    <Layout>
      <Helmet>
        <title>Braga | Cart</title>
      </Helmet>
      <main className="main">
        <CartPageItem/>
      </main>
    </Layout>
  )
}
