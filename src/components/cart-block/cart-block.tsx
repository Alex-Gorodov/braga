import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function CartBlock(): JSX.Element {
  return (
    <div className="cart">
      <p>this is cart</p>
      <Link className="button" to={AppRoute.Cart}></Link>
    </div>
  )
}
