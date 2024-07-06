import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Blog } from "../../components/blog/blog";

export function BlogPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Blog</title>
      </Helmet>
      <Blog/>
    </Layout>
  );
}
