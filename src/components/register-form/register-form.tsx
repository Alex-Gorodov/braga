import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { registerNewUser, toggleSignUpForm } from "../../store/actions";
import { ChangeEvent, useRef, useState } from "react";
import { User } from "../../types/user";
import { addNewUserToDatabase } from "../../store/api-actions";
import { AppDispatch } from "../../types/state";

type UserForm = User & {
  confirmPassword: string;
};

export function RegisterForm(): JSX.Element {
  const isSignUpOpened = useSelector((state: RootState) => state.page.isSignUpFormOpened);
  const dispatch = useDispatch<AppDispatch>();

  const formRef = useOutsideClick(() => {
    dispatch(toggleSignUpForm({isOpened: !isSignUpOpened}));
  }) as React.RefObject<HTMLFormElement>;

  const [formData, setFormData] = useState<UserForm>({
    name: '',
    surname: '',
    email: '',
    phone: 0,
    isAdmin: false,
    cartItems: [],
    subscriptions: [],
    liked: [],
    avatar: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    dispatch(registerNewUser({ user: formData }));
    addNewUserToDatabase(formData);
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: 0,
      isAdmin: false,
      cartItems: [],
      subscriptions: [],
      liked: [],
      avatar: '',
      password: '',
      confirmPassword: '',
    });
    dispatch(toggleSignUpForm({isOpened: !isSignUpOpened}))
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === 'avatar' && files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: URL.createObjectURL(files[0]),
      }));
    } else if (name === 'phone') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: Number(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    isSignUpOpened ? (
      <div className="form__wrapper">
        <form
          action="#"
          className="form register__form"
          onSubmit={handleSubmit}
          method="post"
          ref={formRef}
        >
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="surname">
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="phone">
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="avatar">
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleFieldChange}
            />
          </label>
          {
            formData.avatar && <img src={formData.avatar} alt="Avatar" width={40} height={40} />
          }
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="confirm-password">
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleFieldChange}
            />
          </label>
          <button className="button" type="submit">Create account!</button>
        </form>
      </div>
    ) : <></>
  );
}
