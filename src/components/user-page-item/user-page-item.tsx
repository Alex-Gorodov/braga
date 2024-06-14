import { User } from "../../types/user";
import { useDispatch } from "react-redux";
import { addItemToPreOrder, removeItemFromNotifications, removeItemFromPreOrder } from "../../store/actions";
import { addItemToUserPreOrder, removeItemFromUserNotifications, removeItemFromUserPreOrder } from "../../store/api-actions";
import { useIsMobile } from "../../hooks/useSizes";

type UserProps = {
  user: User;
}

export function UserPageItem({user}: UserProps): JSX.Element {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  return (
    <div className="user">
      <h1 className="visually-hidden">Hello, {user.name}!</h1>
      {
        <h2 className="title title--2">
          Hello, {user.name}!
        </h2>
      }
      <div className="user__avatar-wrapper">
        <img className="user__avatar" src={user.avatar} alt={`${user.name}-avatar`} />
      </div>
      {
        user.preOrder &&
        <div className="user__preorder-list">
          <h3 className="title title--3 preorder-table__title">My pre-order list</h3>
          <div className="preorder-table__wrapper">
            <div className="preorder-table" style={{gridTemplateColumns: isMobile ? `repeat(${user.preOrder.length + 1}, 1fr)` : 'repeat(8, minmax(80px, 1fr))'}}>
              <div className="preorder-table__head">
                <div className="preorder-table__cell preorder-table__cell--head">Name</div>
                <div className="preorder-table__cell preorder-table__cell--head">Amount</div>
                <div className="preorder-table__cell preorder-table__cell--head preorder-table__cell--wild">Decrease / Increase</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="Alcohol by Volume">ABV</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="International Bitterness Units">IBU</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="Standard Reference Method (color)">SRM</div>
                <div className="preorder-table__cell preorder-table__cell--head">Price</div>
                <div className="preorder-table__cell preorder-table__cell--empty"></div>
              </div>
              {user.preOrder.map((item) => {
                const handleRemove = () => {
                  dispatch(removeItemFromPreOrder({ user: user, item: item }));
                  removeItemFromUserPreOrder(user, item, dispatch);
                };
                const handleDecrease = () => {
                  if (item.amount > 0) {
                    dispatch(addItemToPreOrder({
                      user: user,
                      item: { ...item, amount: -1 },
                      amount: -1
                    }));
                    addItemToUserPreOrder(user, { ...item, amount: -1 }, -1);
                  } else {
                    handleRemove();
                  }
                };
                const handleIncrease = () => {
                  dispatch(addItemToPreOrder({
                    user: user,
                    item: { ...item, amount: 1 },
                    amount: 1
                  }));
                  addItemToUserPreOrder(user, { ...item, amount: 1 }, 1);
                };
                return (
                  <div className="preorder-table__row" key={item.id}>
                    <div className="preorder-table__cell">{item.name}</div>
                    <div className="preorder-table__cell">{item.amount}</div>
                    <div className="preorder-table__cell preorder-table__change-buttons-wrapper">
                      <button
                        className="preorder-table__change-btn preorder-table__change-btn--minus"
                        onClick={handleDecrease}
                      >-</button>
                      <button
                        className="preorder-table__change-btn preorder-table__change-btn--plus"
                        onClick={handleIncrease}
                      >+</button>
                    </div>
                    <div className="preorder-table__cell">{item.abv}%</div>
                    <div className="preorder-table__cell">{item.ibu}</div>
                    <div className="preorder-table__cell">{item.srm}</div>
                    <div className="preorder-table__cell preorder-table__cell--price">
                      {item.amount >= 6 ? (
                        <>
                          <span className="preorder-table__price preorder-table__price--sale">{item.amount * item.price}</span>
                          <span className="preorder-table__price preorder-table__price--new-price">{` ${Math.floor((item.amount * item.price) * 0.9)}`}</span>
                        </>
                      ) : (
                        item.amount * item.price
                      )}
                    </div>
                    <div className="preorder-table__cell preorder-table__cell--remove">
                      <button className="preorder-table__remove-btn" onClick={handleRemove}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
      {
        user.notifications &&
        <div className="user__notifications-list">
          <h3 className="title title--3 preorder-table__title">My notifications list</h3>
          <div className="preorder-table__wrapper">
            <div className="preorder-table" style={{gridTemplateColumns: isMobile ? `repeat(${user.notifications.length + 1}, 1fr)` : 'repeat(5, minmax(80px, 1fr))'}}>
              <div className="preorder-table__head">
                <div className="preorder-table__cell preorder-table__cell--head">Name</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="Alcohol by Volume">ABV</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="International Bitterness Units">IBU</div>
                <div className="preorder-table__cell preorder-table__cell--head" title="Standard Reference Method (color)">SRM</div>
                <div className="preorder-table__cell preorder-table__cell--empty"></div>
              </div>
              {user.notifications.map((item) => {
                const handleRemove = () => {
                  dispatch(removeItemFromNotifications({ user: user, item: item }));
                  removeItemFromUserNotifications(user, item, dispatch);
                };

                return (
                  <div className="preorder-table__row" key={item.id}>
                    <div className="preorder-table__cell">{item.name}</div>
                    <div className="preorder-table__cell">{item.abv}%</div>
                    <div className="preorder-table__cell">{item.ibu}</div>
                    <div className="preorder-table__cell">{item.srm}</div>
                    <div className="preorder-table__cell preorder-table__cell--remove">
                      <button className="preorder-table__remove-btn" onClick={handleRemove}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
