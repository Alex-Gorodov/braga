import { ChangeEvent, useState } from "react";
import { Guest } from "../../types/guest";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { addGuestNotification, toggleGuestNotificationForm } from "../../store/actions";
import { Beer } from "../../types/beer";
import { ReactComponent as Cross } from '../../img/icons/cross.svg'

type GuestNotificationFormProps = {
  item: Beer;
};

export function GuestNotificationForm({ item }: GuestNotificationFormProps): JSX.Element {
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
    dispatch(addGuestNotification({ guest: data, item: item }));
    dispatch(toggleGuestNotificationForm({ isOpened: !isGuestNotificationFormOpened }));
  };

  return (
    <div className="form__wrapper">
      <form action="#" method="post" className="form form--guest" ref={formRef} onSubmit={handlePost}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
