import { BeerStatus } from '../../const';
import { ReactComponent as StarIcon } from '../../img/icons/star.svg';
import { Beer } from '../../types/beer';
import cn from "classnames";

type LabelProps = {
  addedClass?: string;
  beer: Beer;
}

export function Soon({addedClass, beer}: LabelProps): JSX.Element {
  const labelClassName = cn('beer__label', {
    'beer__label--soon': beer.status !== BeerStatus.Unavailable && beer.onStock === 0,
  })
  return (
    <span className={`${labelClassName} ${addedClass} ${addedClass}--soon`}>
      <StarIcon/>
      <span>soon</span>
    </span>
  )
}
