import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";

export function BlogPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Blog</title>
      </Helmet>
      <main className="main">

      </main>
    </Layout>
  );
}
