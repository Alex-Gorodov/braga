import { addItemToCart, addItemToNotifications, addItemToPreOrder, setStatusMessage, toggleGuestNotificationForm, updateBeersAmount } from "../../store/actions";
import { AppRoute, AuthorizationStatus, BeerStatus, ErrorMessages, ItemInfo, StockEmojis, SuccessMessages } from "../../const";
import { addItemToUserDatabaseCart, addItemToUserNotifications, addItemToUserPreOrder } from "../../store/api-actions";
import { GuestNotificationForm } from "../guest-notification-form/guest-notification-form";
import { NotAuthReview } from "../not-auth-review/not-auth-review";
import { ReviewForm } from "../review/review-form/review-form";
import { ReviewItem } from "../review/review-item/review-item";
import { useDispatch, useSelector } from "react-redux";
import { BeerStatusLabel } from "./beer-status-label";
import { Link, generatePath } from "react-router-dom";
import { RootState } from "../../store/root-reducer";
import { BeerTimer } from "./beer-timer/beer-timer";
import { useGetUser } from "../../hooks/useGetUser";
import { Spinner } from "../spinner/spinner";
import { User } from "../../types/user";
import { Beer } from "../../types/beer";
import { useState } from "react";
import cn from 'classnames';

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

  const [isNotificationAdding, setNotificationAdding] = useState(false);

  const isNotificationAdded = user?.notifications?.some((beer) => beer.id === item.id);

  const isGuestNotificationFormOpened = useSelector((state: RootState) => state.page.isGuestNotificationFormOpened);

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

  const handleNotificationListUpdate = (user: User) => {
    setNotificationAdding(true)
    if (user) {
      addItemToUserNotifications(user, item)
      dispatch(addItemToNotifications({user: user, item: item}))
      isNotificationAdded && setNotificationAdding(false)
    }
  }

  const handleGuestNotificationListUpdate = () => {
    dispatch(toggleGuestNotificationForm({isOpened: !isGuestNotificationFormOpened}));
  }

  const renderNotificationText = () => {
    if (isNotificationAdding && !isNotificationAdded && isGuestNotificationFormOpened) {
      return <Spinner size={"13"} />;
    }
    if (isNotificationAdded) {
      return 'Got it!';
    }
    if (isGuestNotificationFormOpened) {
      return <Spinner size={"13"} />;
    }
    return 'Get Notified';
  };

  const getStockEmoji = (stock: number) => {
    switch (true) {
        case stock === 0 || !stock:
            return StockEmojis.NotInStock;
        case stock > 0 && stock < 10:
            return StockEmojis.LessThenTen;
        case stock >= 10 && stock < 20:
            return StockEmojis.LessThenTwenty;
        case stock >= 20:
            return StockEmojis.OnStock;
        default:
            return '';
    }
  };

  const emojiCode = getStockEmoji(item.onStock);

  const [isImageScale, setImageScale] = useState(false);

  const [translate, setTranslate] = useState({x: 0, y: 0})

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((event.clientY - rect.top) / rect.height) * 100;
    setTranslate({ x: offsetX, y: offsetY });
  };

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
            <Link className="breadcrumbs__link" to={AppRoute.Shop}>Shop</Link>
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
              <img className="product__image product__image--preview" src={`${item.previewImg}.jpg`} width={200} height={245} alt={item.name} srcSet={`${item.previewImg}@2x.jpg 2x`}/>
            </picture>
          </div>
          <div
            className="product__image-wrapper product__image-wrapper--main"
            onMouseEnter={() => setImageScale(true)}
            onMouseLeave={() => setImageScale(false)}
            onMouseMove={handleMouseMove}
          >
            <picture>
              <source srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" width={135} height={462} />
              <source media="(min-width: 1170px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" />
              <source media="(min-width: 900px)" srcSet={`${item.img}.webp 1x, ${item.img}@2x.webp 2x`} type="image/webp" />
              <img
                className="product__image product__image--main"
                style={{
                  transform: `scale(${isImageScale ? '2.5' : '1'})`,
                  transformOrigin: `${translate.x}% ${translate.y}%`,
                  transition: 'transform 0.2s ease-out'
                }}
                src={`${item.img}.png`}
                width={135}
                height={462}
                alt={item.name}
                srcSet={`${item.img}@2x.png 2x`}
              />
            </picture>
            {item.brewingDate && item.status !== BeerStatus.Ready && <BeerTimer item={item} />}
            {item.status !== BeerStatus.Ready && <BeerStatusLabel status={item.status} className={`product__status-label product__status-label--${item.status.toLowerCase()}`} />}
          </div>

        </div>
        <div className="product__details">
          <div className="product__name-wrapper">
            <span className="product__name beer__item-name">
              {item.name}
            </span>
          </div>
          <span className="product__price">₪ {item.price}</span>
          <p className="product__description">{item.description}</p>
          <div className="product__buttons">
            <input type="number" name="amount-to-add" id="" min={1} max={item.onStock} step={1} className="button product__amount-input" value={amount} onChange={handleChange}/>
            <button type="button" className="button button--no-shadow product__button product__button--plus" onClick={() => handleIncrease()} disabled={item.status === BeerStatus.Unavailable && !(item.onStock > amount)}>+</button>
            <button type="button" className="button button--no-shadow product__button product__button--minus" onClick={() => handleDecrease()}>-</button>
            <button
              type="button"
              className="button product__button product__button--add"
              onClick={() => {
                user && dispatch(addItemToCart({user: user, item: {...item, amount: amount}, amount: amount}))
                user && addItemToUserDatabaseCart(user, {...item, amount: amount})
                user && updateBeersAmount({beerToUpdate: item, numToUpdate: amount})
                user && dispatch(setStatusMessage({message: SuccessMessages.AddToCart}))
                !user && dispatch(setStatusMessage({message: ErrorMessages.AddingToCartError}))
              }}
              disabled={item.status !== BeerStatus.Ready}
            >Add to cart</button>
            {
              item.status !== BeerStatus.Unavailable && item.status !== BeerStatus.Ready &&
              <button
                className="button product__button product__button--preorder"
                type="button"
                onClick={() => {
                  setNotificationAdding(false);
                  if (user) {
                    dispatch(addItemToPreOrder({ user: user, item: { ...item, amount: amount }, amount: amount }));
                    addItemToUserPreOrder(user, { ...item, amount: amount }, amount);
                    dispatch(setStatusMessage({message: SuccessMessages.AddToPreOrder}))
                  } else {
                    dispatch(setStatusMessage({message: ErrorMessages.PreOrderError}))
                  }
                }}
              >
                Preorder
              </button>
            }
          </div>
          <div className="product__amount">
            <p className="product__details-title">in stock:</p>
            <span className="product__amount-wrapper">
              {
                item.onStock < 100 ?
                  item.onStock < 10 ?
                    `00${item.onStock}` : `0${item.onStock}`
                  :
                `${item.onStock}`
              }
              <span dangerouslySetInnerHTML={{ __html: ` &#${emojiCode};` }} />
            </span>
            {
              !item.onStock &&
              <button className="button button--small"
                onClick={() => {
                  setNotificationAdding(true);
                  user ? handleNotificationListUpdate(user) : handleGuestNotificationListUpdate();
                }}
              >
                { renderNotificationText() }
              </button>
            }
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
                      <td>{item.calories} per 0.33l</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            ) : (
              <div className="product__review-wrapper">
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
      {
        isGuestNotificationFormOpened && <GuestNotificationForm item={item} className="form--banner-opened"/>
      }
    </div>
  )
}
