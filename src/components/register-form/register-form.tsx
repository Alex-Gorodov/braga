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
import { addNewUserToDatabase } from "../../store/api-actions";
import { Upload } from "./upload-avatar";

export function RegisterForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);
  const formRef = useOutsideClick(() => {
    dispatch(toggleSignUpForm({ isOpened: !isSignUpOpened }));
  }) as React.RefObject<HTMLFormElement>;
  const uploadedUrl = useSelector((state: RootState) => state.page.uploadedPath);

  const users = useSelector((state: RootState) => state.data.users)

  const authedUser = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<RegisterUser>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    isAdmin: false,
    cartItems: [],
    subscriptions: [],
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log('User registered:', user.uid);
      console.log('users length before:', users.length);

      await addNewUserToDatabase({
        id: user.uid,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        isAdmin: false,
        cartItems: [],
        subscriptions: [],
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


      dispatch(setUploadedPath({ path: null }));
      dispatch(toggleSignUpForm({ isOpened: false }));
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user: ' + error);
    }
  };

  return (
    isSignUpOpened ? (
      <div className="form__wrapper">
        <form
          action="#"
          className="form register__form"
          onSubmit={handleRegister}
          method="post"
          ref={formRef}
        >
          <h3 className="title title--3 form__title">Sign up</h3>
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
          <button className="button" type="submit">Create account!</button>
        </form>
      </div>
    ) : <></>
  );
}
