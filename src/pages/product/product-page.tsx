import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeerItem } from "../../components/beer-item/beer-item";
import { Layout } from "../../components/layout/layout";
import { RootState } from "../../store/root-reducer";
import { Spinner } from "../../components/spinner/spinner";
import { Beer } from "../../types/beer";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { PageNotFound } from "../page-not-found/page-not-found";

export function ProductPage(): JSX.Element {
  const { id } = useParams();
  const beers = useSelector((state: RootState) => state.data.beers);
  const [product, setProduct] = useState<Beer | null>(null);

  const isPageLoaded = document.readyState === 'complete';

  useEffect(() => {
    const itemId = Number(id);
    const foundProduct = beers.find((beer) => beer.id === itemId);

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, beers]);

  return (
    <Layout>
      <Helmet>
        <title>{`Shop | ${product ? product.name : 'Not found'}`}</title>
      </Helmet>
      {!isPageLoaded ? (
        <Spinner size={"40"} wrapper />
      ) : (
        product && isPageLoaded ? (
          <BeerItem item={product} />
        ) : (
          <PageNotFound />
        )
      )}
    </Layout>
  );
}
