import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Shop } from "../../components/shop/shop";

export function ShopPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Shop</title>
      </Helmet>
      <main className="main">
        <Shop/>
      </main>
    </Layout>
  );
}
