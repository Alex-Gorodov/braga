import { useDispatch, useSelector } from "react-redux";
import { toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { RootState } from "../../store/root-reducer";

export function NotAuthReview(): JSX.Element {

  const dispatch = useDispatch();

  const login = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const register = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const buttonsWrapperStyle = {
    'display': 'flex',
    'gap': '40px'
  }

  return (
    <div>
      <p>To write a review, log in or register.</p>
      <div className="buttons-wrapper" style={buttonsWrapperStyle}>
        <button className="button button--reverse" type="button" onClick={() => dispatch(toggleSignInForm({isOpened: !login}))}>Sign in</button>
        <button className="button" type="button" onClick={() => dispatch(toggleSignUpForm({isOpened: !register}))}>Register</button>
      </div>
    </div>
  )
}
