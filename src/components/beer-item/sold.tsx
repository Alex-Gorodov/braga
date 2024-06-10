import { ReactComponent as StarIcon } from '../../img/icons/star.svg';

export function Sold(): JSX.Element {
  return (
    <div className="beer__label beer__label--sold">
      <StarIcon />
      <span>sold</span>
    </div>
    )
}
