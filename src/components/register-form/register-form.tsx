import { setUserInformation, requireAuthorization, toggleSignUpForm, setUploadedPath, setStatusMessage } from "../../store/actions";
import { ReactComponent as Showed } from '../../img/icons/showed-password.svg';
import { ReactComponent as Hidden } from '../../img/icons/hidden-password.svg';
import { addNewUserToDatabase, loginAction } from "../../store/api-actions";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as Cross } from '../../img/icons/cross.svg';
import { AuthorizationStatus, ErrorMessages } from "../../const";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { setUser } from "../../store/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { AppDispatch } from "../../types/state";
import { RegisterUser } from "../../types/user";
import { ChangeEvent, useState } from "react";
import { Spinner } from "../spinner/spinner";
import { Upload } from "./upload-avatar";

type RegisterFormProps = {
  className?: string;
}

export function RegisterForm({ className }: RegisterFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const uploadedUrl = useSelector((state: RootState) => state.page.uploadedPath);

  const authedUser = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<RegisterUser>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    isAdmin: false,
    cartItems: [],
    notifications: [],
    liked: [],
    avatar: '',
    password: '',
    confirmPassword: '',
    preOrder: [],
    token: ''
  });

  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const formRef = useOutsideClick(() => {
    handleCloseForm();
  }) as React.RefObject<HTMLFormElement>;

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === 'avatar' && files) {
      setData((prevdata) => ({
        ...prevdata,
        avatar: URL.createObjectURL(files[0]),
      }));
    } else {
      setData((prevdata) => ({
        ...prevdata,
        [name]: value,
      }));
    }
  };

  const [isPassShowed, setPassShowed] = useState(false);
  const [isConfirmPassShowed, setConfirmPassShowed] = useState(false);
  const [isAuthing, setIsAuthing] = useState(false);

  const handleCloseForm = () => {
    dispatch(toggleSignUpForm({ isOpened: false }));
    setData({
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      isAdmin: false,
      cartItems: [],
      notifications: [],
      liked: [],
      avatar: '',
      password: '',
      confirmPassword: '',
      preOrder: [],
      token: ''
    })
    setConfirmPassShowed(false);
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthing(true);
    const auth = getAuth();

    if (data.password !== data.confirmPassword) {
      dispatch(setStatusMessage({message: ErrorMessages.RegisterPasswordNotMatch}))
      setIsAuthing(false);
      return;
    }

    const passwordValidationRegex = /^(?=.*\d).{8,}$/;
    if (!passwordValidationRegex.test(data.password)) {
      dispatch(setStatusMessage({message: ErrorMessages.PasswordError}))
      setIsAuthing(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      await addNewUserToDatabase({
        id: user.uid,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        isAdmin: false,
        cartItems: [],
        notifications: [],
        liked: [],
        avatar: uploadedUrl || '',
        token,
        preOrder: []
      }, dispatch);

      dispatch(setUser({
        email: user.email!,
        id: user.uid,
        token
      }));

      dispatch(requireAuthorization({ authorizationStatus: AuthorizationStatus.Auth }));

      dispatch(setUserInformation({ userInformation: authedUser }));
      const authData = {
        login: data.email,
        password: data.password,
      };
      const userInfo = {
        email: user.email!,
        id: user.uid,
        token: token
      };
      localStorage.setItem('braga-user', JSON.stringify(userInfo));

      dispatch(loginAction(authData));
      dispatch(setUploadedPath({ path: null }));
      handleCloseForm();
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user: ' + error);
    } finally {
      setIsAuthing(false);
    }
  };

  const handleFormError = () => {
    if (data.name === '' || data.surname === '' || data.email === '' || data.phone.length < 8) {
      dispatch(setStatusMessage({message: ErrorMessages.RegisterEmptyFields}));
      setIsAuthing(false);
      return;
    }
  };

  return (
    isSignUpOpened ? (
      <div className="form__wrapper">
        <form
          action="#"
          className={`form form--register register-form ${className} ${isSignUpOpened ? '' : 'form--animated'}`}
          onSubmit={handleRegister}
          method="post"
          ref={formRef}
        >
          <h3 className="title title--3 form__title">Sign up</h3>
          <button className="form__close-btn" type="button" onClick={() => handleCloseForm()}>
            <Cross />
          </button>
          <label className="form__item" htmlFor="name">
            <span className="form__label">Your name:</span>
            <input
              className="form__input"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name*"
              value={data.name}
              onChange={handleFieldChange}
            />
          </label>
          <label className="form__item" htmlFor="surname">
            <span className="form__label">Your surname:</span>
            <input
              className="form__input"
              type="text"
              name="surname"
              id="surname"
              required
              placeholder="Surname*"
              value={data.surname}
              onChange={handleFieldChange}
            />
          </label>
          <label className="form__item" htmlFor="email">
            <span className="form__label">Your e-mail:</span>
            <input
              className="form__input"
              type="email"
              name="email"
              id="email"
              required
              placeholder="E-mail*"
              value={data.email}
              onChange={handleFieldChange}
            />
          </label>
          <label className="form__item" htmlFor="phone">
            <span className="form__label">Your phone:</span>
            <input
              className="form__input"
              type="text"
              name="phone"
              id="phone"
              required
              placeholder="Phone*"
              value={data.phone}
              onChange={handleFieldChange}
            />
          </label>
          <label className="form__item" htmlFor="avatar">
            <span className="form__label form__label--visible">Choose avatar:</span>
            <Upload />
          </label>
          <label className="form__item" htmlFor="password">
            <span className="form__label">Create password (at least 8 symbols with at least one letter and one number):</span>
            <input
              className="form__input"
              type={isPassShowed ? 'text' : 'password'}
              name="password"
              id="password"
              required
              placeholder="Password*"
              value={data.password}
              onChange={handleFieldChange}
            />
            <span className="form__show-pass-btn" role="button" onClick={() => setPassShowed(!isPassShowed)}>
              <span className="visually-hidden">{isPassShowed ? 'hide password' : 'show password'}</span>
              {isPassShowed ? <Showed /> : <Hidden />}
            </span>
          </label>
          <label className="form__item" htmlFor="confirm-password">
            <span className="form__label">Confirm password:</span>
            <input
              className="form__input"
              type={isConfirmPassShowed ? 'text' : 'password'}
              name="confirmPassword"
              id="confirm-password"
              required
              placeholder="Confirm password*"
              value={data.confirmPassword}
              onChange={handleFieldChange}
            />
            <span className="form__show-pass-btn" role="button" onClick={() => setConfirmPassShowed(!isConfirmPassShowed)}>
              <span className="visually-hidden">{isConfirmPassShowed ? 'hide password' : 'show password'}</span>
              {isConfirmPassShowed ? <Showed /> : <Hidden />}
            </span>
          </label>
          <button className="button form__submit" type="submit" disabled={isAuthing} onClick={() => handleFormError()}>
            {isAuthing
              ? <Spinner size={"16"} />
              : 'Create account!'
            }</button>
        </form>
      </div>
    ) : <></>
  );
}
