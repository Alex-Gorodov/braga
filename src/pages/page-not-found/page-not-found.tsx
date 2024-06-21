import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { AppRoute } from "../../const";

export function PageNotFound(): JSX.Element {
  return (
    <Layout>
      <div className="not-found">
        <h1 className="title title--1">
          Page nof found
        </h1>
        <Link to={AppRoute.Root} className="button">
          Go to main
        </Link>
      </div>
    </Layout>
  )
}
