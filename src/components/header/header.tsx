import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../const";
import { ReactComponent as Logo} from '../../img/icons/logo.svg';
import { ReactComponent as Cart} from '../../img/icons/cart.svg';
import { useEffect, useState } from "react";
import cn from 'classnames';
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";

export function Header(): JSX.Element {
  const cardItems = useSelector((state: RootState) => state.page.cartItems);
  const [activePage, setActivePage] = useState('');
  const location = useLocation();

  const pageClassName = (page: string) => cn('navigation__link', {
    'navigation__link--active': activePage === page,
  });

    useEffect(() => {
      const validPaths: AppRoute[] = [AppRoute.Root, AppRoute.Shop, AppRoute.Blog];
      const pathname = location.pathname as AppRoute;
      setActivePage(validPaths.includes(pathname) ? pathname : '');
    }, [location.pathname]);



  return (
    <header className="header">
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
      </nav>
      <p className="header__cart-wrapper">
        <Cart/>
        <span>{cardItems.length}</span>
      </p>
    </header>
  )
}
