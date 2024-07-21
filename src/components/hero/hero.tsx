import { ReactComponent as Star} from '../../img/icons/star.svg';
import { HeroSwiper } from '../hero-swiper/hero-swiper';
import { useIsMobile } from '../../hooks/useSizes';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import 'swiper/css/navigation';
import 'swiper/css';
import { useParallax } from '../../hooks/useParallax';
import { Parallax } from '../parallax/parallax';

export function Hero(): JSX.Element {
  const isMobile = useIsMobile();
  const parallax = useParallax();

  return (
    <section className='section'>
      <div className='hero section__container'>
        <div className="section__wrapper">
          <div className='hero__wrapper'>
            {
              isMobile && <Parallax mouseX={parallax.x} mouseY={parallax.y}/>
            }
            <div className='hero__star'>
              <Star/>
            </div>
            <p className='hero__text'>
              The <span className='hero__text hero__text--bold'>journey</span> of our craft <span className='hero__text hero__text--bold'>microbrewery</span>
            </p>
            <Link className='button button--reverse' to={AppRoute.Blog}>Learn more</Link>
          </div>
          <HeroSwiper/>
          {
            !isMobile && <Parallax mouseX={parallax.x} mouseY={parallax.y}/>
          }
        </div>
      </div>
      <div className="section__container section__container--background">
        <div className="section__wrapper">
          <div className="hero__wrapper hero__wrapper--image">
            <img className="hero__image" src={`/braga/img/haifa${isMobile ? '' : '@2x'}.webp`} alt="Haifa bay" width={750} height={520}/>
          </div>
          <div className="hero__wrapper hero__wrapper--text">
            <p className='hero__text hero__text--centered'>
              100% natural<br/> and&nbsp;<span className='hero__text hero__text--bold'>handcrafted</span>
              {
                `parallaxX: ${parallax.x}, parallaxY: ${parallax.y}`

              }
            </p>
            <p className="hero__description">
              Our beer showcases pure ingredients and traditional brewing methods, reflecting our dedication to quality and craftsmanship.
            </p>
            <Link className='button' to={AppRoute.Blog}>Learn more</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
