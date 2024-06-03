import { Link, useLocation } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { ReactComponent as Logo} from '../../img/icons/braga-logo.svg';
import { ReactComponent as Cart} from '../../img/icons/cart.svg';
import { ReactComponent as UserIcon} from '../../img/icons/user.svg';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useIsMobile } from "../../hooks/isMobile";
import { AuthForm } from "../auth-form/auth-form";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import CartBlock from "../cart-block/cart-block";
import { toggleSignInForm } from "../../store/actions";
import { RegisterForm } from "../register-form/register-form";

export function Header(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const isSignInOpened = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const [activePage, setActivePage] = useState('Home');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isCartOpened, setCartOpened] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const cartClassName = cn('cart', {
    'cart--opened': isCartOpened
  })

  const isMobile = useIsMobile();

  const mobileNavClassName = cn('navigation__mobile', {
    'navigation__mobile--opened': isMenuOpened
  })

  const authorizationStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );
  const userInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  const headerClassName = cn('header', {
    'header--mobile': isMobile
  })

  const pageClassName = (page: string) => cn('navigation__link', {
    'navigation__link--active': activePage === page,
    'navigation__link--mobile': isMobile
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
    isMobile && setMenuOpened(false);
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
        !isMobile ?
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
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <img className="user-navigation__avatar" src={user?.avatar} alt="" width={60} height={60}/>
                  :
                  <div className="header__form-wrapper">
                    <button className="header__btn" onClick={() => dispatch(toggleSignInForm({isOpened: !isSignInOpened}))} type="button">
                      <UserIcon/>
                    </button>
                  </div>
                }
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
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <p>{userInfo?.name}</p>
                  :
                  <div className="header__form-wrapper">
                    <button className="header__btn" onClick={() => dispatch(toggleSignInForm({isOpened: !isSignInOpened}))} type="button">
                      <UserIcon/>
                    </button>
                  </div>
                }
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
