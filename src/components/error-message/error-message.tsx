import { toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { ReactComponent as Cross } from '../../img/icons/cross.svg';
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { ErrorMessages } from "../../const"

type ErrorMessageProps = {
  message: ErrorMessages;
  fun: (arg: boolean) => void;
}

export function ErrorMessage({message, fun}: ErrorMessageProps): JSX.Element {
  const messageRef = useOutsideClick(() => {
    fun(false);
  }) as React.RefObject<HTMLDivElement>;

  const dispatch = useDispatch();

  const signInStatus = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const signUpStatus = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const handleSignInClick = () => {
    fun(false);
    dispatch(toggleSignInForm({isOpened: !signInStatus}));
  }

  const handleSignUpClick = () => {
    fun(false);
    dispatch(toggleSignUpForm({isOpened: !signUpStatus}));
  }

  const handleGuestNotificationClick = () => {
    fun(false);
  }

  return (
    <div className='message message--error' ref={messageRef}>
      <button className="message__close-btn" onClick={() => fun(false)}>
        <Cross/>
      </button>
      <p>
        {message}
      </p>
      {
        message !== ErrorMessages.GuestNotificationError
        ?
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
