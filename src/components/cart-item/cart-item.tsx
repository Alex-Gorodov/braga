import { BeerInCart } from "../../types/beer";

type CartItemProps = {
  item: BeerInCart;
}

export function CartItem({item}: CartItemProps): JSX.Element {
  return (
    <div>
      {item.name} {item.amount}
    </div>
  )
}