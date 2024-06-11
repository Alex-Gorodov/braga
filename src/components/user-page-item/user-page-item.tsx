import { useIsMobile } from "../../hooks/useSizes";
import { User } from "../../types/user";

type UserProps = {
  user: User;
}

export function UserPageItem({user}: UserProps): JSX.Element {
  const isMobile = useIsMobile();

  return (
    <div className="user">
      <h1 className="visually-hidden">Hello, {user.name}!</h1>
      {
        !isMobile &&
        <h2 className="title title--2">
          Hello, {user.name}!
        </h2>
      }
      <div className="user__avatar-wrapper">
        <img className="user__avatar" src={user.avatar} alt={`${user.name}-avatar`} />
      </div>
      <div className="user__preorder-list">
        <h3 className="title title--3">Pre-ordered</h3>
        <table className="product__details-table preorder-table">
          <thead>
            <tr className="preorder-table__head">
              <th>Name</th>
              <th>Amount</th>
              <th title="Alcohol by Volume">ABV</th>
              <th title="International Bitterness Units">IBU</th>
              <th title="Standard Reference Method (color)">SRM</th>
            </tr>
          </thead>
          <tbody>
            {user.preOrder.map(item => (
              <tr className="preorder-table__item" key={item.id}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.abv}%</td>
                <td>{item.ibu}</td>
                <td>{item.srm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
