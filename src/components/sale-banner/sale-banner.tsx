import { ReactComponent as Cross } from '../../img/icons/cross.svg'

type BannerProps = {
  fun: () => void;
}

export function SaleBanner({fun}: BannerProps): JSX.Element {

  return (
    <div className="ticker">
      <p className="ticker__message">&#129321; Get a 10% discount &#128184; when you buy 6 or more bottles! &#127867;&#127881;</p>
      <button className="ticker__close-btn" onClick={() => fun()}>
        <span className="visually-hidden">Close ticker.</span>
        <Cross/>
      </button>
    </div>
  )
}
