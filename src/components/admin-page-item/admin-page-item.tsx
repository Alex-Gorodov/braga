import { useSelector } from "react-redux"
import { RootState } from "../../store/root-reducer"

export function AdminPageItem(): JSX.Element {
  const beers = useSelector((state: RootState) => state.data.beers);
  const subscribers = useSelector((state: RootState) => state.data.subscribers);
  const guests = useSelector((state: RootState) => state.data.guests);
  const users = useSelector((state: RootState) => state.data.users);

  return (
    <div className="user admin user--admin">
      <h1 className="visually-hidden">Admin page</h1>
      <h2 className="title title--2">Admin desk</h2>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Beers</h3>
        <ul className="admin__list">
          {
            beers && beers.map((i) => {
              return (
                <li className="admin__list-item" key={`admin-beer-${i.name}`}>
                  <span>{i.name}</span>
                  <span>{i.onStock}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Pre-orders</h3>
        <ul className="admin__list">
          {
            users && users.map((user) => {
              return (
                user.preOrder.length > 0
                ?
                <li className="admin__list-item" key={`user-${user.email}`}>
                  <span>{user.email}</span>
                  <span>{
                    user.preOrder.map((item) => {
                      return (
                        item.name + ' - ' + item.amount
                      )
                    })
                  }</span>
                </li>
                :
                'No preorders'
              )
            })
          }
        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Subscribers</h3>
        <ul className="admin__list">
          {
            subscribers && subscribers.map((i) => {
              return (
                <li className="admin__list-item" key={`subscriber-${i.email}`}>
                  <span>{i.email}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="admin__container">
        <h3 className="title title--3 admin__container-title">Guests notifications</h3>
        <ul className="admin__list">
          {
            guests && guests.map((guest) => {
              return (
                <li className="admin__list-item" key={`guest-${guest.name}`}>
                  <span>{guest.name}</span>
                  <span>
                    {
                      guest.email ? guest.email : guest.phone
                    }
                  </span>
                  <span>
                    {
                      guest.notifications.map((i) => {
                        return (
                          guest.notifications.indexOf(i) === guest.notifications.length ? `${i.name},` : i.name
                        )
                      })
                    }
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
