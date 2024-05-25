import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Hero } from "../../components/hero/hero";

export function HomePage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Home</title>
      </Helmet>
      <main className="main">
        <Hero/>
      </main>
    </Layout>
  );
}
