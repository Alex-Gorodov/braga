import { ChangeEvent, useState } from "react";
import { Guest } from "../../types/guest";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { addGuestNotification, toggleGuestNotificationForm, toggleSignInForm, toggleSignUpForm } from "../../store/actions";
import { Beer } from "../../types/beer";
import { ReactComponent as Cross } from '../../img/icons/cross.svg'
import { addGuestNotificationToDatabase } from "../../store/api-actions";

type GuestNotificationFormProps = {
  item: Beer;
  className?: string;
};

export function GuestNotificationForm({ item, className }: GuestNotificationFormProps): JSX.Element {
  const dispatch = useDispatch();
  const isGuestNotificationFormOpened = useSelector((state: RootState) => state.page.isGuestNotificationFormOpened);
  const guests = useSelector((state: RootState) => state.data.guests);

  const [data, setData] = useState<Guest>({
    id: guests.length,
    name: '',
    phone: null,
    email: null,
    notifications: []
  });

  const [error, setError] = useState<string | null>(null);

  const formRef = useOutsideClick(() => {
    dispatch(toggleGuestNotificationForm({ isOpened: !isGuestNotificationFormOpened }));
  }) as React.RefObject<HTMLFormElement>;

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.phone && !data.email) {
      setError('Please enter either a phone number or an email address.');
      return;
    }

    setError(null); // Clear any previous errors
    addGuestNotificationToDatabase(data, item);
    dispatch(addGuestNotification({ guest: data, item: item }));
    dispatch(toggleGuestNotificationForm({ isOpened: !isGuestNotificationFormOpened }));
  };

  const handleSignIn = () => {
    dispatch(toggleGuestNotificationForm({ isOpened: !isGuestNotificationFormOpened }));
    dispatch(toggleSignInForm({isOpened: true}))
  }

  const handleSignUp = () => {
    dispatch(toggleGuestNotificationForm({ isOpened: !isGuestNotificationFormOpened }));
    dispatch(toggleSignUpForm({isOpened: true}))
  }

  return (
    <div className="form__wrapper">
      <form action="#" method="post" className={`form form--guest ${className}`} ref={formRef} onSubmit={handlePost}>
        <h3 className="title title--3 form__title">Get notification as guest</h3>
        <button className="form__close-btn" type="button" onClick={() => dispatch(toggleGuestNotificationForm({isOpened: false}))}>
          <Cross/>
        </button>
        <label className="form__item">
          <span className="form__label">Name:</span>
          <input className="form__input" type="text" name="name" placeholder="Name*" value={data.name} onChange={handleFieldChange} required />
        </label>
        <label className="form__item">
          <span className="form__label">Phone:</span>
          <input className="form__input" type="tel" name="phone" placeholder="Phone" value={data.phone || ''} onChange={handleFieldChange} />
        </label>
        <label className="form__item">
          <span className="form__label">Email:</span>
          <input className="form__input" type="email" name="email" placeholder="Email" value={data.email || ''} onChange={handleFieldChange} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button form__submit form__submit--guest" type="submit">Submit</button>
        <h3 className="title title--3 form__title">Or</h3>
        <div className="form__buttons-wrapper">
          <button className="button button--reverse" type="button" onClick={() => handleSignIn()}>Sign in</button>
          <button className="button" type="button" onClick={() => handleSignUp()}>Sign up</button>
        </div>

      </form>
    </div>
  );
}
