import { ReactComponent as StarIcon } from '../../img/icons/star.svg';

type LabelProps = {
  cn?: string;
}

export function Soon({cn}: LabelProps): JSX.Element {
  return (
    <span className={`beer__label beer__label--soon ${cn} ${cn}--soon`}>
      <StarIcon/>
      <span>soon</span>
    </span>
  )
}
