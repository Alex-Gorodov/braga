import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ReactComponent as Star} from '../../img/icons/star.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { BeerItem } from '../beer-item/beer-item';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { Spinner } from '../spinner/spinner';

export function Hero(): JSX.Element {

  const isLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const beers = useSelector((state: RootState) => state.data.beers);

  return (
    <div className='hero'>
      <div className="hero__wrapper">
        <div className="hero__star">
          <Star/>
        </div>
        <p className='hero__text'>
          The journey of our <span className='hero__text hero__text--bold'>successful<br/></span> craft <span className='hero__text hero__text--bold'>microbrewery</span>
        </p>
        <button className='button'>Learn more</button>
      </div>
      {
        isLoading ? <Spinner size={"80"}/> :
        <div className="hero__wrapper beer">
          <Swiper
            loop={true}
            spaceBetween={30}
            navigation={{
              prevEl: '.beer__btn--prev',
              nextEl: '.beer__btn--next'
            }}
            modules={[Autoplay, Navigation]}
            centeredSlides={true}
            autoplay={{
              delay: 4000
            }}
            speed={1000}
            slidesPerView={1}
            slidesPerGroup={1}
          >
            {
              beers.map((item) => (
                <SwiperSlide key={`slide-${item.id}`}>
                  <BeerItem item={item}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className="hero__swiper-buttons beer__buttons">
            <button className="beer__btn beer__btn--prev">
              <span className="visually-hidden">previous slide</span>
            </button>
            <button className="beer__btn beer__btn--next">
              <span className="visually-hidden">next slide</span>
            </button>
          </div>
        </div>
      }
    </div>
  )
}
