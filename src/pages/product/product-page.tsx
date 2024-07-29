import { PageNotFound } from "../page-not-found/page-not-found";
import { BeerItem } from "../../components/beer-item/beer-item";
import { Spinner } from "../../components/spinner/spinner";
import { Layout } from "../../components/layout/layout";
import { RootState } from "../../store/root-reducer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Beer } from "../../types/beer";

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
