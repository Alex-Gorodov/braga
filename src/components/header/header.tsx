import { toggleCart, toggleGuestNotificationForm, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { HeaderUserProfile } from "../header-user-profile/header-user-profile";
import { ReactComponent as Logo} from '../../img/icons/braga-logo.svg';
import { ReactComponent as Cart} from '../../img/icons/cart.svg';
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RegisterForm } from "../register-form/register-form";
import { SaleBanner } from "../sale-banner/sale-banner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Link, useLocation } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";
import { useIsTablet } from "../../hooks/useSizes";
import { AuthForm } from "../auth-form/auth-form";
import CartBlock from "../cart-block/cart-block";
import { useEffect, useState } from "react";
import { AppRoute } from "../../const";
import cn from 'classnames';

export function Header(): JSX.Element {
  const activeUser = useGetUser();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.data.users.find((user) => user.id === activeUser?.id)?.cartItems);
  const [activePage, setActivePage] = useState('Home');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const isCartOpened = useSelector((state: RootState) => state.page.isCartOpened)
  const [isBannerClosed, setBannerClosed] = useState(false);
  const location = useLocation();

  const cartClassName = cn('cart', {
    'cart--opened': isCartOpened
  })

  const isTablet = useIsTablet();

  const mobileNavClassName = cn('navigation__mobile', {
    'navigation__mobile--opened-with-banner': !isBannerClosed && isMenuOpened,
    'navigation__mobile--opened': isMenuOpened,
  })

  const loginFormClassName = cn({
    'form--banner-opened': !isBannerClosed,
  })

  const headerClassName = cn('header', {
    'header--mobile': isTablet
  })

  const pageClassName = (page: string) => cn('navigation__link', {
    'navigation__link--active': activePage === page,
    'navigation__link--mobile': isTablet
  });

  const burgerClassName = cn("header__burger", {
    "header__burger--opened" : isMenuOpened,
  })


  useEffect(() => {
    const validPaths: string[] = [AppRoute.Root, AppRoute.Shop, AppRoute.Blog, AppRoute.ProductPage, AppRoute.UserPage];
    const pathname = location.pathname;
    setActivePage(validPaths.includes(pathname) ? pathname : '');
    if (pathname.includes('/shop/')) setActivePage(AppRoute.Shop as string);

  }, [location.pathname]);

  const menuRef = useOutsideClick(() => {
    isTablet && setMenuOpened(false);
  }) as React.RefObject<HTMLDivElement>;

  const cartRef = useOutsideClick(() => {
    dispatch(toggleCart({isCartOpened: false}))
  }) as React.RefObject<HTMLDivElement>;

  const totalAmount = cartItems ? cartItems.reduce((sum, cartItem) => sum + cartItem.amount, 0) : 0;

  const handleCartOpen = () => {
    dispatch(toggleCart({isCartOpened: !isCartOpened}))
  }

  return (
    <header className={headerClassName}>
      {!isBannerClosed && <SaleBanner fun={() => setBannerClosed(true)}/>}
      {
        !isTablet ?
          <nav className="header__navigation navigation">
            <Link className="navigation__logo" to={AppRoute.Root}>
              <Logo/>
            </Link>
            <ul className="navigation__list">
              <li className="navigation__item">
                <Link className={pageClassName(AppRoute.Root)} to={AppRoute.Root}>Home</Link>
              </li>
              <li className="navigation__item">
                <Link className={pageClassName(AppRoute.Shop)} to={AppRoute.Shop}>Shop</Link>
              </li>
              <li className="navigation__item">
                <Link className={pageClassName(AppRoute.Blog)} to={AppRoute.Blog}>Blog</Link>
              </li>
            </ul>
            <ul className="header__user-navigation user-navigation">
              <li className="user-navigation__item">
                <button className="header__cart-wrapper header__btn" onClick={handleCartOpen} type="button">
                  <Cart/>
                  <span>{totalAmount}</span>
                </button>
              </li>
              <li className="user-navigation__item">
                <HeaderUserProfile/>
              </li>
            </ul>
          </nav>
      :
      <>
        <div className="header__container">
          <button className={burgerClassName} onClick={() => {
            setMenuOpened(!isMenuOpened);
            dispatch(toggleCart({isCartOpened: false}))
            dispatch(toggleSignInForm({isOpened: false}))
            dispatch(toggleSignUpForm({isOpened: false}))
            dispatch(toggleGuestNotificationForm({isOpened: false}))
          }}
          type="button"
          >
            <span className="header__burger-line"></span>
          </button>
          <ul className="header__user-navigation user-navigation">
              <li className="user-navigation__item">
                <button className="header__cart-wrapper header__btn" onClick={handleCartOpen} type="button">
                  <Cart/>
                  <span>{totalAmount}</span>
                </button>
              </li>
              <li className="user-navigation__item" onClick={() => setMenuOpened(false)}>
                <HeaderUserProfile/>
              </li>
            </ul>
        </div>
        <nav className={mobileNavClassName} ref={menuRef}>
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link className={pageClassName(AppRoute.Root)} to={AppRoute.Root}>Home</Link>
            </li>
            <li className="navigation__item">
              <Link className={pageClassName(AppRoute.Shop)} to={AppRoute.Shop}>Shop</Link>
            </li>
            <li className="navigation__item">
              <Link className={pageClassName(AppRoute.Blog)} to={AppRoute.Blog}>Blog</Link>
            </li>
          </ul>
        </nav>
      </>
      }
      <CartBlock ref={cartRef} className={cartClassName}/>
      <AuthForm className={loginFormClassName}/>
      <RegisterForm className={loginFormClassName}/>
    </header>
  )
}
