import { Beer } from "../../types/beer";

type CartItemProps = {
  item: Beer;
}

export function CartItem({item}: CartItemProps): JSX.Element {
  return (
    <div>
      {item.name}
    </div>
  )
}