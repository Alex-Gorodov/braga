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
  const [state, setState] = useState<{ product: Beer | null, isLoading: boolean }>({
    product: null,
    isLoading: true,
  });

  useEffect(() => {
    setState({ product: null, isLoading: true });

    const timer = setTimeout(() => {
      const itemId = Number(id);
      const foundProduct = beers.find((beer) => beer.id === itemId);
      setState({
        product: foundProduct || null,
        isLoading: false,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [id, beers]);

  const { product, isLoading } = state;

  if (!product && !isLoading) {
    return <PageNotFound/>;
  }

  return (
    <Layout>
      <Helmet>
        <title>{`Shop | ${product?.name}`}</title>
      </Helmet>
      {product ? <BeerItem item={product} /> : <Spinner size={"40"} wrapper />}
    </Layout>
  );
}
