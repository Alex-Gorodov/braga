import { setUserInformation, requireAuthorization, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { ReactComponent as Cross } from '../../img/icons/cross.svg';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthorizationStatus, ErrorMessages } from "../../const";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { setUser } from "../../store/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/api-actions";
import { ChangeEvent, useRef, useState } from "react";
import { RootState } from "../../store/root-reducer";
import { AppDispatch } from "../../types/state";
import { Spinner } from "../spinner/spinner";

type FormProps = {
  value: string;
  error: boolean;
  errorValue: string;
  regexp: RegExp;
};

type dataProps = {
  [key: string]: FormProps;
};

type AuthFormProps = {
  className?: string;
}

export function AuthForm({className}: AuthFormProps): JSX.Element {

  const dispatch = useDispatch<AppDispatch>();

  const isSignInOpened = useSelector((state: RootState) => state.page.isSignInFormOpened);
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const [isAuthing, setIsAuthing] = useState(false);

  const [error, setError] = useState<ErrorMessages | null>(null);

  const initialData: dataProps = {
    email: {
      value: '',
      error: false,
      errorValue: ErrorMessages.EmailError,
      regexp: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    },
    password: {
      value: '',
      error: false,
      errorValue: ErrorMessages.PasswordError,
      regexp: /(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]{2,}/,
    }
  };

  const [data, setData] = useState<dataProps>(initialData);

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

  const handleCloseForm = () => {
    dispatch(toggleSignInForm({isOpened: !isSignInOpened}));
    setData(initialData);
  }

  const formRef = useOutsideClick(() => {
    handleCloseForm();
  }) as React.RefObject<HTMLFormElement>;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthing(true);
    const auth = getAuth();

    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email.value, data.password.value);
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

      handleCloseForm();
    } catch (error) {
      setError(ErrorMessages.AuthError);
      setTimeout(() => {
        setError(null);
      }, 3000);
      console.error(error);
    } finally {
      setIsAuthing(false);
    }
  };

  return (
    isSignInOpened ?
    <div className="form__wrapper ">
      <form className={`login__form form ${className}`} action="#" method="post" onSubmit={handleLogin} ref={formRef}>
        <h3 className="title title--3 form__title">Sign in</h3>
        <button className="form__close-btn" type="button" onClick={() => handleCloseForm()}>
          <Cross/>
        </button>
        {
          <>
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
              <button className="login__submit form__submit button" type="submit" disabled={isAuthing}>
                {isAuthing
                  ? <Spinner size={"16"}/>
                  : 'Sign in'}
              </button>
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
          </>
        }
        <p className={`form__error-message ${error ? 'form__error-message--opened' : ''}`}>{error}</p>
      </form>
    </div>
    : <></>
  )
}
