import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { AdminPageItem } from "../../components/admin-page-item/admin-page-item";

export function AdminPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Admin</title>
      </Helmet>
      <main className="main">
        <AdminPageItem/>
      </main>
    </Layout>
  )
}
