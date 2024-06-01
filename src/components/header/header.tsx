import { Link, useLocation } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { ReactComponent as Logo} from '../../img/icons/logo.svg';
import { ReactComponent as Cart} from '../../img/icons/cart.svg';
import { ReactComponent as UserIcon} from '../../img/icons/user.svg';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useIsMobile } from "../../hooks/isMobile";
import { AuthForm } from "../auth-form/auth-form";

export function Header(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.data.cartItems);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const [activePage, setActivePage] = useState('Home');
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isLoginFormOpened, setLoginFormOpened] = useState(false);
  const location = useLocation();

  const isMobile = useIsMobile();

  const dispatch = useDispatch();

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

  const totalAmount = cartItems.reduce((sum, cartItem) => sum + cartItem.amount, 0);

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
                <Link className="header__cart-wrapper" to={AppRoute.Cart}>
                  <Cart/>
                  <span>{totalAmount}</span>
                </Link>
              </li>
              <li className="user-navigation__item">
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <img className="user-navigation__avatar" src={user?.avatar} alt="" width={60} height={60}/>
                  :
                  <div className="header__form-wrapper">
                    <button className="header__login-btn" onClick={() => setLoginFormOpened(!isLoginFormOpened)}>
                      <UserIcon/>
                      {
                        isLoginFormOpened && <AuthForm/>
                      }
                    </button>
                  </div>
                }
              </li>
            </ul>
          </nav>
    :
      <>
        <div className="header__container">
          <button className={burgerClassName} onClick={() => setMenuOpened(!isMenuOpened)}>
            <span className="header__burger-line"></span>
          </button>
          <ul className="header__user-navigation user-navigation">
              <li className="user-navigation__item">
                <Link className="header__cart-wrapper" to={AppRoute.Cart}>
                  <Cart/>
                  <span>{totalAmount}</span>
                </Link>
              </li>
              <li className="user-navigation__item">
                {
                  authorizationStatus === AuthorizationStatus.Auth
                  ?
                  <p>{userInfo?.name}</p>
                  :
                  <div className="header__form-wrapper">
                    <button className="header__login-btn" onClick={() => setLoginFormOpened(!isLoginFormOpened)}>
                      <UserIcon/>
                      {
                        isLoginFormOpened && <AuthForm/>
                      }
                    </button>
                  </div>
                }
              </li>
            </ul>
        </div>
        <nav className={mobileNavClassName}>
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
    </header>
  )
}
