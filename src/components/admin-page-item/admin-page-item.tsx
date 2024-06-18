import { adminChangeBeerCount, adminToggleBeerOnBrewing } from "../../store/api-actions";
import { toggleBeerOnBrewing, updateBeersAmount } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { FormCheckbox } from "../checkbox/checkbox";
import { Beer } from "../../types/beer";
import { useState } from "react";

export function AdminPageItem(): JSX.Element {
  const beers = useSelector((state: RootState) => state.data.beers);
  const subscribers = useSelector((state: RootState) => state.data.subscribers);
  const guests = useSelector((state: RootState) => state.data.guests);
  const users = useSelector((state: RootState) => state.data.users);
  const dispatch = useDispatch();

  const [beerAmounts, setBeerAmounts] = useState<{ [key: number]: number }>(
    beers.reduce((acc: { [key: number]: number }, beer: Beer) => {
      acc[beer.id] = beer.onStock;
      return acc;
    }, {})
  );

  const handleUpdateBeerAmount = (e: React.FormEvent<HTMLFormElement>, beer: Beer) => {
    e.preventDefault();
    const amount = beerAmounts[beer.id];
    const beerToUpdate = beers.find(beerToFind => beerToFind.id === beer.id);

    if (beerToUpdate) {
      dispatch(updateBeersAmount({ beerToUpdate, numToUpdate: amount }));
      adminChangeBeerCount(beerToUpdate, amount);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, beer: Beer) => {
    const { value } = e.target;
    setBeerAmounts({ ...beerAmounts, [beer.id]: Number(value) });
    adminChangeBeerCount(beer, Number(value));
  };

  const handleUpdateIsOnBreewing = (beer: Beer, isOnBrew: boolean) => {
    dispatch(toggleBeerOnBrewing({beer: beer, isOnBrewing: isOnBrew}));
    adminToggleBeerOnBrewing(beer, isOnBrew);
  }

  return (
    <div className="user admin user--admin">
      <h1 className="visually-hidden">Admin page</h1>
      <h2 className="title title--2">Admin desk</h2>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Beers</h3>
        <ul className="admin__list">
            <li className="admin__list-item admin__list-item--beer admin__list-item--head" key={`admin-beer-table`}>
              <div className="admin__table-cell admin__table-cell--name">
                <span>Name</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name">
                <span>Brew</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name admin__table-cell--amount">
                <span>Amount</span>
              </div>
            </li>
          {beers && beers.map((i) => (
            <li className="admin__list-item admin__list-item--beer" key={`admin-beer-${i.name}`}>
              <div className="admin__table-cell admin__table-cell--name">
                <span>{i.style}</span>
              </div>
              <div className="admin__table-cell admin__table-cell--on-brewing">
                <span>
                  <FormCheckbox id={i.name} checked={i.onBrewing} onChange={() => handleUpdateIsOnBreewing(i, !i.onBrewing)}/>
                </span>
              </div>
              <div className="admin__table-cell admin__table-cell--value">
                <form className="admin__form-item" action="#" method="post" onSubmit={(e) => handleUpdateBeerAmount(e, i)}>
                  <label htmlFor={`beer-${i.id}`}>
                    <input
                      type="number"
                      name={`beer-${i.id}`}
                      id={`beer-${i.id}`}
                      value={beerAmounts[i.id]}
                      onChange={(e) => handleChange(e, i)}
                      className="admin__input"
                    />
                  </label>
                  <button className="admin__submit-btn" type="submit">Set</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Pre-orders</h3>
        <ul className="admin__list">
            <li className="admin__list-item admin__list-item--preorders">
              <div className="admin__table-cell admin__table-cell--name">
                <span>User</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name">
                <span>Beer</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name">
                <span>Amount</span>
              </div>
            </li>
            {users && users.map((user) => (
              user.preOrder.length > 0 ? (
                <li className="admin__list-item admin__list-item--preorders" key={`user-${user.email}`}>
                  <div className="admin__table-cell admin__table-cell--preorders admin__table-cell--value">
                    <span>{`${user.name} ${user.surname.slice(0, 1)}. (${user.email})`}</span>
                  </div>
                  <div className="admin__table-cell admin__table-cell--preorders admin__table-cell--value">
                    {user.preOrder.map((item) => (
                      <div key={`item-${item.name}-${user.email}`}>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="admin__table-cell admin__table-cell--preorders admin__table-cell--value">
                    {user.preOrder.map((item) => (
                      <div key={`amount-${item.name}-${user.email}`}>
                        <span>{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </li>
              ) : (
                <li className="admin__list-item" key={`user-no-preorder-${user.email}`}>No pre-orders</li>
              )
            ))}

        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Subscribers</h3>
        <ul className="admin__list">
          {subscribers && subscribers.map((i) => (
            <li className="admin__list-item admin__list-item--subscriber" key={`subscriber-${i.email}`}>
              <div className="admin__table-cell admin__table-cell--subscriber">
                <span>{i.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Guests notifications</h3>
        <ul className="admin__list">
            <li className="admin__list-item admin__list-item--notification">
              <div className="admin__table-cell admin__table-cell--name">
                <span>Name</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name">
                <span>Email/phone</span>
              </div>
              <div className="admin__table-cell admin__table-cell--name">
              <span>Beer</span>
              </div>
            </li>
          {guests && guests.map((guest) => (
            <li className="admin__list-item admin__list-item--notification" key={`guest-${guest.name}`}>
              <div className="admin__table-cell admin__table-cell--notification admin__table-cell--value">
                <span>{guest.name}</span>
              </div>
              <div className="admin__table-cell admin__table-cell--notification admin__table-cell--value">
                <span>{guest.email ? guest.email : guest.phone}</span>
              </div>
              <div className="admin__table-cell admin__table-cell--notification admin__table-cell--value">
              <span>{guest.notifications.map((i, idx) => (
                <span key={`guest-notification-${guest.name}-${idx}`}>{i.name}{idx < guest.notifications.length - 1 ? ', ' : ''}</span>
              ))}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
