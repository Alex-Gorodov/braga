import { useDispatch, useSelector } from "react-redux";
import { AppRoute, AuthorizationStatus } from "../../const";
import { toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { RootState } from "../../store/root-reducer";
import { useGetUser } from "../../hooks/useGetUser";
import { ReactComponent as UserIcon} from '../../img/icons/user.svg';
import { logoutAction } from "../../store/api-actions";
import { AppDispatch } from "../../types/state";
import { useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";


export function HeaderUserProfile(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );
  const [isUserMenuOpened, setUserMenuOpened] = useState(false);
  const user = useGetUser();
  const isSignInOpened = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const link = generatePath(AppRoute.UserPage, {
    id: `${user?.id}`,
  });

  const userMenuRef = useOutsideClick(() => {
    setUserMenuOpened(!isUserMenuOpened);
  }) as React.RefObject<HTMLUListElement>;

  const size = 50;

  return (
    authorizationStatus === AuthorizationStatus.Auth
    ?
    <div className="user-navigation__avatar-wrapper">
      <button className="user-navigation__button" onClick={() => setUserMenuOpened(!isUserMenuOpened)}>
        <img className="user-navigation__avatar" src={user?.avatar} alt="" width={size} height={size}/>
      </button>
      {
        isUserMenuOpened &&
        <ul className="user-navigation__menu" ref={userMenuRef}>
          <li className="user-navigation__menu-item">
            <Link className="user-navigation__menu-link" to={link}>Profile</Link>
          </li>
          {
            user?.isAdmin &&
            <li className="user-navigation__menu-item">
              <Link className="user-navigation__menu-link" to={AppRoute.AdminPage}>Admin page</Link>
            </li>
          }
          <li className="user-navigation__menu-item">
            <Link className="user-navigation__menu-link" to={AppRoute.Root} onClick={(e) => {
              setUserMenuOpened(!isUserMenuOpened)
              dispatch(logoutAction());
            }}>Sign out</Link>
          </li>
        </ul>
      }
    </div>
    :
    <div className="header__form-wrapper">
      <button className="header__btn user-navigation__button" onClick={() => {
        dispatch(toggleSignInForm({isOpened: !isSignInOpened}));
        isSignUpOpened && dispatch(toggleSignUpForm({isOpened: false})) && dispatch(toggleSignInForm({isOpened: false}))
      }} type="button">
        <UserIcon/>
      </button>
    </div>
  )
}
