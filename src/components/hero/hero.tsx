import { ReactComponent as Star} from '../../img/icons/star.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { HeroSwiper } from '../swiper/swiper';

export function Hero(): JSX.Element {
  return (
    <section className='section section--hero'>
      <div className='hero'>
        <div className='hero__wrapper'>
          <div className='hero__star'>
            <Star/>
          </div>
          <p className='hero__text'>
            The journey of our <span className='hero__text hero__text--bold'>successful</span> craft <span className='hero__text hero__text--bold'>microbrewery</span>
          </p>
          <button className='button'>Learn more</button>
        </div>
        <HeroSwiper/>
      </div>
    </section>
  )
}
