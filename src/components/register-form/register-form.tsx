import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { setUserInformation, requireAuthorization, toggleSignUpForm, setUploadedPath } from "../../store/actions";
import { ChangeEvent, useState } from "react";
import { AppDispatch } from "../../types/state";
import { RegisterUser } from "../../types/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/user-slice";
import { AuthorizationStatus } from "../../const";
import { addNewUserToDatabase, loginAction } from "../../store/api-actions";
import { Upload } from "./upload-avatar";
import { ReactComponent as Cross } from '../../img/icons/cross.svg'
import { Spinner } from "../spinner/spinner";

type RegisterFormProps = {
  className?: string;
}

export function RegisterForm({className}: RegisterFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);

  const formRef = useOutsideClick(() => {
    dispatch(toggleSignUpForm({ isOpened: !isSignUpOpened }));
  }) as React.RefObject<HTMLFormElement>;

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

  const [isAuthing, setIsAuthing] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthing(true);
    const auth = getAuth();

    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
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

      dispatch(setUserInformation({userInformation: authedUser}))
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
      dispatch(toggleSignUpForm({ isOpened: false }));
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user: ' + error);
    } finally {
      setIsAuthing(false);
    }
  };

  return (
    isSignUpOpened ? (
      <div className="form__wrapper">
        <form
          action="#"
          className={`form form--register register-form ${className}`}
          onSubmit={handleRegister}
          method="post"
          ref={formRef}
        >
          <h3 className="title title--3 form__title">Sign up</h3>
          <button className="form__close-btn" type="button" onClick={() => dispatch(toggleSignUpForm({isOpened: false}))}>
            <Cross/>
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
            <Upload/>
          </label>
          <label className="form__item" htmlFor="password">
            <span className="form__label">Create password (at least 8 symbols with at least one letter and one number):</span>
            <input
              className="form__input"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password*"
              value={data.password}
              onChange={handleFieldChange}
            />
          </label>
          <label className="form__item" htmlFor="confirm-password">
            <span className="form__label">Confirm password:</span>
            <input
              className="form__input"
              type="password"
              name="confirmPassword"
              id="confirm-password"
              required
              placeholder="Confirm password*"
              value={data.confirmPassword}
              onChange={handleFieldChange}
            />
          </label>
          <button className="button form__submit" type="submit" disabled={isAuthing}>
            {isAuthing
              ? <Spinner size={"16"}/>
              : 'Create account!'
            }</button>
        </form>
      </div>
    ) : <></>
  );
}
