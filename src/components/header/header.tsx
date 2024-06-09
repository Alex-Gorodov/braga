import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../const";
import { ReactComponent as Logo} from '../../img/icons/braga-logo.svg';
import { ReactComponent as Cart} from '../../img/icons/cart.svg';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useIsTablet } from "../../hooks/useSizes";
import { AuthForm } from "../auth-form/auth-form";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import CartBlock from "../cart-block/cart-block";
import { RegisterForm } from "../register-form/register-form";
import { HeaderUserProfile } from "../header-user-profile/header-user-profile";

export function Header(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const [activePage, setActivePage] = useState('Home');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isCartOpened, setCartOpened] = useState(false);
  const location = useLocation();

  const cartClassName = cn('cart', {
    'cart--opened': isCartOpened
  })

  const isTablet = useIsTablet();

  const mobileNavClassName = cn('navigation__mobile', {
    'navigation__mobile--opened': isMenuOpened
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
      const validPaths: string[] = [AppRoute.Root, AppRoute.Shop, AppRoute.Blog, AppRoute.ProductPage];
      const pathname = location.pathname;
      setActivePage(validPaths.includes(pathname) ? pathname : '');
      if (pathname.includes('/shop/')) setActivePage(AppRoute.Shop as string);

    }, [location.pathname]);

  const menuRef = useOutsideClick(() => {
    isTablet && setMenuOpened(false);
  }) as React.RefObject<HTMLDivElement>;

  const cartRef = useOutsideClick(() => {
    setCartOpened(false);
  }) as React.RefObject<HTMLDivElement>;

  const totalAmount = cartItems.reduce((sum, cartItem) => sum + cartItem.amount, 0);

  const handleCartOpen = () => {
    setCartOpened(!isCartOpened)
  }

  return (
    <header className={headerClassName}>
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
          <button className={burgerClassName} onClick={() => setMenuOpened(!isMenuOpened)} type="button">
            <span className="header__burger-line"></span>
          </button>
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
      <CartBlock ref={cartRef} cartClassName={cartClassName}/>
      <AuthForm/>
      <RegisterForm/>
    </header>
  )
}
