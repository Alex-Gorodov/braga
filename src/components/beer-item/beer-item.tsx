import { Link, generatePath } from "react-router-dom";
import { AppRoute, AuthorizationStatus, ItemInfo } from "../../const";
import { Beer } from "../../types/beer"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addItemToPreOrder } from "../../store/actions";
import { addItemToUserDatabaseCart, addItemToUserPreOrder } from "../../store/api-actions";
import cn from 'classnames';
import { ReviewForm } from "../review/review-form/review-form";
import { ReviewItem } from "../review/review-item/review-item";
import { RootState } from "../../store/root-reducer";
import { NotAuthReview } from "../not-auth-review/not-auth-review";
import { Soon } from "./soon";
import { useGetUser } from "../../hooks/useGetUser";

type BeerItemProps = {
  item: Beer;
}

export function BeerItem({item}: BeerItemProps): JSX.Element {
  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const authStatus = useSelector((state: RootState) => state.auth.authorizationStatus);

  const user = useGetUser();

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

  const [activeInfo, setActiveInfo] = useState('Description');

  const infoBtnClassName = (page: string) => cn('product__info-nav-link', {
    'product__info-nav-link--active': activeInfo === page
  })


  return (
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
          <div className="product__name-wrapper">
            <span className="product__name">
              {item.name}
              {
                item.onBrewing
                ?
                <Soon cn="product__label"/>
                :
                ''
              }
            </span>
          </div>
          <span className="product__price">₪ {item.price}</span>
          <p className="product__description">{item.description}</p>
          <div className="product__buttons">
            <input type="number" name="amount-to-add" id="" min={1} max={item.onStock} step={1} className="button product__amount-input" value={amount} onChange={handleChange}/>
            <button type="button" className="button button--no-shadow product__button product__button--plus" onClick={() => handleIncrease()} disabled={!item.onBrewing && !(item.onStock > amount)}>+</button>
            <button type="button" className="button button--no-shadow product__button product__button--minus" onClick={() => handleDecrease()}>-</button>
            <button
              type="button"
              className="button product__button product__button--add"
              onClick={() => {
                user && dispatch(addItemToCart({user: user, item: {...item, amount: amount}, amount: amount}))
                user && addItemToUserDatabaseCart(user, {...item, amount: amount})
              }}
              disabled={!(item.onStock > amount - 1)}
            >Add to cart</button>
            {
              item.onBrewing &&
              <button
                className="button produce__button product__button--preorder"
                type="button"
                onClick={() => {
                  if (user) {
                    dispatch(addItemToPreOrder({ user: user, item: { ...item, amount: amount } }));
                    addItemToUserPreOrder(user, { ...item, amount: amount });
                  }
                }}
              >
                Preorder
              </button>
            }
          </div>
          <div className="product__amount">
            <p className="product__details-title">sku:</p>
            <span>
              {
                item.onStock < 100 ?
                  item.onStock < 10 ?
                    `00${item.onStock}` : `0${item.onStock}`
                  :
                `${item.onStock}`
              }
            </span>
          </div>
          <div>
            <p className="product__details-title">Categories:</p>
            <ul className="product__categories">
              <li className="product__category" key={`cat-${item.id}`}>
                {item.categories.map((c, index) => (
                  <span key={`cat-${c}-${item.id}`}>
                    {c}{index < item.categories.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="product__info">
          <div className="product__info-buttons-wrapper">
            <button className={infoBtnClassName(ItemInfo.Description)} onClick={() => setActiveInfo(ItemInfo.Description)}>Description</button>
            <button className={infoBtnClassName(ItemInfo.Additional)} onClick={() => setActiveInfo(ItemInfo.Additional)}>Additional information</button>
            <button className={infoBtnClassName(ItemInfo.Reviews)} onClick={() => setActiveInfo(ItemInfo.Reviews)}>Reviews({item.reviews?.length ? item.reviews.length : 0})</button>
          </div>
          <div className="product__info-content">
            {activeInfo === ItemInfo.Description ? (
              <p className="product__description">{item.description}</p>
            ) : activeInfo === ItemInfo.Additional ? (
              <div>
                <table className="product__details-table">
                  <tbody>
                    <tr>
                      <td>Vol:</td>
                      <td>0.33l</td>
                    </tr>
                    <tr>
                      <td>ABV:</td>
                      <td>{item.abv}%</td>
                    </tr>
                    <tr>
                      <td>IBU:</td>
                      <td>{item.ibu}</td>
                    </tr>
                    <tr>
                      <td>SRM:</td>
                      <td>{item.srm}</td>
                    </tr>
                    <tr>
                      <td>Calories:</td>
                      <td>{item.calories}/per 0.33l</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            ) : (
              <div className="product__review-wrapper">
                <p className="product__details-title product__details-title--small">Reviews</p>
                {item.reviews && item.reviews.length > 0 ? (
                  <>
                    <ul className="product__review-list">
                      {item.reviews.map((review, index) => (
                        <li key={index}>
                          <ReviewItem item={review} />
                        </li>
                      ))}
                    </ul>
                    <p className="product__details-title product__details-title--small">Add review</p>
                  </>
              ) : (
                <div>
                  <p>There are no reviews yet.</p>
                  {
                    <p className="product__details-title product__details-title--small">Be the first to review “{item.name}”</p>
                  }
                </div>
              )}
              {
                authStatus === AuthorizationStatus.Auth
                  ?
                  <ReviewForm item={item}/>
                  :
                  <NotAuthReview/>
              }
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
