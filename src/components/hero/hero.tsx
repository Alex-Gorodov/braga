import { ReactComponent as Star} from '../../img/icons/star.svg';
import { HeroSwiper } from '../hero-swiper/hero-swiper';
import { useIsMobile } from '../../hooks/useSizes';
import { Link } from 'react-router-dom';
import { AppRoute, ErrorMessages } from '../../const';
import 'swiper/css/navigation';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { ErrorMessage } from '../error-message/error-message';
import { noUserAddToCart } from '../../store/actions';

export function Hero(): JSX.Element {
  const isMobile = useIsMobile();
  const isUserError = useSelector((state: RootState) => state.page.isUserError);
  const dispatch = useDispatch();

  return (
    <section className='section'>
      <div className='hero section__container'>
        <div className="section__wrapper">
          <div className='hero__wrapper'>
            <div className='hero__star'>
              <Star/>
            </div>
            <p className='hero__text'>
              The <span className='hero__text hero__text--bold'>journey</span> of our craft <span className='hero__text hero__text--bold'>microbrewery</span>
            </p>
            <Link className='button button--reverse' to={AppRoute.Blog}>Learn more</Link>
          </div>
          <HeroSwiper/>
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
            </p>
            <p className="hero__description">
              Our beer showcases pure ingredients and traditional brewing methods, reflecting our dedication to quality and craftsmanship.
            </p>
            <Link className='button' to={AppRoute.Blog}>Learn more</Link>
          </div>
        </div>
        {
            isUserError && <ErrorMessage message={ErrorMessages.AddingToCartError} fun={() => dispatch(noUserAddToCart({isNotUser: false}))}/>
        }
      </div>
    </section>
  )
}
