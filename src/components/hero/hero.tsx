import { ReactComponent as Star} from '../../img/icons/star.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { HeroSwiper } from '../swiper/swiper';

export function Hero(): JSX.Element {
  return (
    <section className='section section--hero'>
      <div className='hero section__container'>
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
      <div className="section__container">
        <div className="hero__wrapper hero__wrapper--image">
          <img className="hero__image" src="braga/img/haifa.jpg" alt="Haifa bay" width={750} height={520}/>
        </div>
        <div className="hero__wrapper hero__wrapper--text">
          <p className='hero__text hero__text--centered'>
            100% natural<br/> and&nbsp;<span className='hero__text hero__text--bold'>handcrafted</span>
          </p>
          <p className="hero__description">
            Our beer showcases pure ingredients and traditional brewing methods, reflecting our dedication to quality and craftsmanship.
          </p>
          <button className='button'>Learn more</button>
        </div>
      </div>
    </section>
  )
}
