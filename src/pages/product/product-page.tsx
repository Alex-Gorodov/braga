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
  const [isLoading, setIsLoading] = useState(true);

  const isBeerExists = beers.some(b => b.id === Number(id));
  console.log(isBeerExists);


  useEffect(() => {
    setIsLoading(true);

    const itemId = Number(id);
    const foundProduct = beers.find((beer) => beer.id === itemId);

    if (foundProduct) {
      setProduct(foundProduct);
      setIsLoading(false);
    } else {
      setTimeout(() => {

        setIsLoading(false)
      }, 1200);
    }

  }, [id, beers]);

  // console.log('product', product);
  // console.log('loading', isLoading);

  return (
    <Layout>
      <Helmet>
        <title>{`Shop | ${product ? product.name : 'Not found'}`}</title>
      </Helmet>
      {isLoading ? (
        <Spinner size={"40"} wrapper />
      ) : (
        product ? (
          <BeerItem item={product} />
        ) : (
          <PageNotFound />
        )
      )}
    </Layout>
  );
}
