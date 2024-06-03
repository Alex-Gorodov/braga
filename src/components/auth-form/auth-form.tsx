import { useDispatch, useSelector } from "react-redux";
import { redirectToRoute, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { AppRoute, ErrorMessage } from "../../const";
import { loginAction } from "../../store/api-actions";
import { ChangeEvent, useRef, useState } from "react";
import { AuthData } from "../../types/auth-data";
import { AppDispatch } from "../../types/state";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store/root-reducer";

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

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      const authData: AuthData = {
        login: loginRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(loginAction(authData));
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    isSignInOpened ?
    <div className="form__wrapper">
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} ref={formRef}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            ref={loginRef}
            required
            value={data.email.value}
            onChange={handleFieldChange}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            required
            value={data.password.value}
            onChange={handleFieldChange}
          />
        </div>
        <div className="form__buttons">
          <button className="login__submit form__submit button" type="submit">Sign in</button>
          <p>Have not account?</p>
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
