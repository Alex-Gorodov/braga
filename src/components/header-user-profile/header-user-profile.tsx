import { useDispatch, useSelector } from "react-redux";
import { AuthorizationStatus } from "../../const";
import { toggleSignInForm } from "../../store/actions";
import { RootState } from "../../store/root-reducer";
import { useGetUser } from "../../hooks/useGetUser";
import { ReactComponent as UserIcon} from '../../img/icons/user.svg';
import { useIsTablet } from "../../hooks/useSizes";


export function HeaderUserProfile(): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );
  const user = useGetUser();
  const isSignInOpened = useSelector((state: RootState) => state.page.isSignInFormOpened);

  const isTablet = useIsTablet();

  const size = isTablet ? 50 : 60;

  return (
    authorizationStatus === AuthorizationStatus.Auth
    ?
    <div className="user-navigation__avatar-wrapper">
      <img className="user-navigation__avatar" src={user?.avatar} alt="" width={size} height={size}/>
    </div>
    :
    <div className="header__form-wrapper">
      <button className="header__btn" onClick={() => dispatch(toggleSignInForm({isOpened: !isSignInOpened}))} type="button">
        <UserIcon/>
      </button>
    </div>
  )
}
