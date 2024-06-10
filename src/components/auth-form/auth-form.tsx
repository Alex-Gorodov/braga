import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, requireAuthorization, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { AuthorizationStatus, ErrorMessage } from "../../const";
import { ChangeEvent, useRef, useState } from "react";
import { AppDispatch } from "../../types/state";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store/root-reducer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/user-slice";
import { loginAction } from "../../store/api-actions";

type FormProps = {
  value: string;
  error: boolean;
  errorValue: string;
  regexp: RegExp;
};

type dataProps = {
  [key: string]: FormProps;
};

export function AuthForm(): JSX.Element {

  const dispatch = useDispatch<AppDispatch>();

  const isSignInOpened = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const [data, setData] = useState<dataProps>({
    email: {
      value: '',
      error: false,
      errorValue: ErrorMessage.EmailError,
      regexp: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    },
    password: {
      value: '',
      error: false,
      errorValue: ErrorMessage.PasswordError,
      regexp: /(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]{2,}/,
    }
  });

  const handleFieldChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    const isValidField = data[name].regexp.test(value);

    if (!isValidField) {
      target.setCustomValidity(data[name].errorValue);
    } else {
      target.setCustomValidity('');
    }

    setData({
      ...data,
      [name]: {
        ...data[name],
        value,
        error: !isValidField,
      },
    });
  };

  const formRef = useOutsideClick(() => {
    dispatch(toggleSignInForm({isOpened: !isSignInOpened}));
  }) as React.RefObject<HTMLFormElement>;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email.value, data.password.value)
      .then(async ({ user }) => {
        const token = await user.getIdToken();
        const userInfo = {
          email: user.email!,
          id: user.uid,
          token: token
        };
        localStorage.setItem('braga-user', JSON.stringify(userInfo));
        dispatch(setUser(userInfo));
        dispatch(requireAuthorization({ authorizationStatus: AuthorizationStatus.Auth }));
        dispatch(setUserInformation({ userInformation: userInfo }));
        const authData = {
          login: loginRef.current?.value || "",
          password: passwordRef.current?.value || "",
        };
        dispatch(loginAction(authData));
        dispatch(toggleSignInForm({ isOpened: false }));
      })
      .catch(console.error);
  };

  return (
    isSignInOpened ?
    <div className="form__wrapper">
      <form className="login__form form" action="#" method="post" onSubmit={handleLogin} ref={formRef}>
        <h3 className="title title--3 form__title">Sign in</h3>
        <div className="form__input-wrapper">
          <label className="form__item">
            <span className="form__label">E-mail:</span>
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Email*"
              ref={loginRef}
              required
              value={data.email.value}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="form__input-wrapper">
          <label className="form__item">
            <span className="form__label">Password:</span>
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Password*"
              ref={passwordRef}
              required
              value={data.password.value}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="form__buttons">
          <button className="login__submit form__submit button" type="submit">Sign in</button>
          <p>Have not account yet?</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              dispatch(toggleSignInForm({isOpened: !isSignInOpened}));
              dispatch(toggleSignUpForm({isOpened: !isSignUpOpened}));
            }}
          >Sign up</button>
        </div>
      </form>
    </div>
    : <></>
  )
}
