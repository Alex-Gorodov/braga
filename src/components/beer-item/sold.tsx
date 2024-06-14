import { ReactComponent as StarIcon } from '../../img/icons/star.svg';

type SoldProps = {
  cn?: string;
}

export function Sold({cn}: SoldProps): JSX.Element {
  return (
    <div className={`beer__label beer__label--sold ${cn}`}>
      <StarIcon />
      <span>sold</span>
    </div>
    )
}
