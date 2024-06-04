import { Link, generatePath } from "react-router-dom";
import { AppRoute } from "../../const";
import { Beer } from "../../types/beer"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/actions";
import { addItemToDatabaseCart } from "../../store/api-actions";

type BeerItemProps = {
  item: Beer;
}

export function BeerItem({item}: BeerItemProps): JSX.Element {
  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const dispatch = useDispatch();

  const [amount, setAmount] = useState<number>(1);

  const handleIncrease = () => {
    setAmount(prevAmount => prevAmount + 1);
  };

  const handleDecrease = () => {
    setAmount(prevAmount => (prevAmount > 1 ? prevAmount - 1 : 1));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  return (
    <main className="main">
      <div className="product">
        <h1 className="visually-hidden">{item.name}'s page</h1>
        <div className="product__top-wrapper">
          <h2 className="title title--2">Shop</h2>
          <ul className="breadcrumbs product__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoute.Root}>Home</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={link}>{item.name}</Link>
            </li>
          </ul>
        </div>
        <div className="product__wrapper">
          <div className="product__gallery">
            <div className="product__image-wrapper product__image-wrapper--preview">
              <picture>
                <source srcSet={`${item.previewImg}.webp 1x, ${item.previewImg}@2x.webp 2x`} type="image/webp" width={200} height={245}/>
                <source media="(min-width: 1170px)" srcSet={`${item.previewImg}.webp 1x, ${item.previewImg}@2x.webp 2x`} type="image/webp"/>
                <source media="(min-width: 900px)" srcSet={`${item.previewImg}.webp 1x, ${item.previewImg}@2x.webp 2x`} type="image/webp"/>
                <img className="product__image" src={`${item.previewImg}.jpg`} width={200} height={245} alt={item.name} srcSet={`${item.previewImg}@2x.jpg 2x`}/>
              </picture>
            </div>
            <div className="product__image-wrapper product__image-wrapper--main">
              <picture>
                <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={135} height={462}/>
                <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
                <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp"/>
                <img className="product__image" src={`${item.img}.png`} width={135} height={462} alt={item.name} srcSet={`${item.img}@2x.png 2x`}/>
              </picture>
            </div>
          </div>
          <div className="product__details">
            <p className="product__name">{item.name}</p>
            <span className="product__price">₪ {item.price}</span>
            <p className="product__description">{item.description}</p>
            <div className="product__buttons">
              <input type="number" name="amount-to-add" id="" min={1} step={1} className="button product__amount-input" value={amount} onChange={handleChange} disabled={!(item.onStock > amount)}/>
              <button type="button" className="button button--no-shadow product__button--plus" onClick={() => handleIncrease()} disabled={!(item.onStock > amount)}>+</button>
              <button type="button" className="button button--no-shadow product__button--minus" onClick={() => handleDecrease()}>-</button>
              <button
                type="button"
                className="button product__button--add"
                onClick={() => {
                  dispatch(addItemToCart({item: {...item, amount: amount}, amount: amount}))
                  addItemToDatabaseCart({...item, amount: amount})
                }}
                disabled={!(item.onStock > amount)}
              >Add to cart</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
