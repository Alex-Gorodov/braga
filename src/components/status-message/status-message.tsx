import { setStatusMessage, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { ReactComponent as Cross } from '../../img/icons/cross.svg';
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ErrorMessages, SuccessMessages } from "../../const"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";


type StatusMessageProps = {
  message: ErrorMessages | SuccessMessages | null;
}

export function StatusMessage({message}: StatusMessageProps): JSX.Element {
  const messageRef = useOutsideClick(() => {
    dispatch(setStatusMessage({message: null}))
  }) as React.RefObject<HTMLDivElement>;

  const requiresAuth = message === ErrorMessages.GuestNotificationError
  || message === ErrorMessages.PreOrderError
  || message === ErrorMessages.AddingToCartError;

  const dispatch = useDispatch();


  const signInStatus = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const signUpStatus = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const handleSignInClick = () => {
    dispatch(setStatusMessage({message: null}))
    dispatch(toggleSignInForm({isOpened: !signInStatus}));
  }

  const handleSignUpClick = () => {
    dispatch(setStatusMessage({message: null}))
    dispatch(toggleSignUpForm({isOpened: !signUpStatus}));
  }

  const handleGuestNotificationClick = () => {
    dispatch(setStatusMessage({message: null}))
  }

  return (
    <div className={`message`} ref={messageRef}>
      <button className="message__close-btn" onClick={() => (dispatch(setStatusMessage({message: null})))}>
        <Cross/>
      </button>
      <p>
        {message}
      </p>
      {
        requiresAuth ?
        <div className="message__buttons-wrapper">
          <button className="button button--reverse message__btn" onClick={handleSignInClick}>Sign in</button>
          <button className="button message__btn" onClick={handleSignUpClick}>Sign up</button>
        </div>
        :
        <button className="button button--narrow" onClick={handleGuestNotificationClick}>Ok</button>
      }
    </div>
  )
}
