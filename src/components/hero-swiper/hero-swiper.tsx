import { BeerItemPreview } from "../beer-item/beer-item-preview";
import { Autoplay, Navigation } from "swiper/modules";
import { RootState } from "../../store/root-reducer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spinner } from "../spinner/spinner";
import { useSelector } from "react-redux";
import 'swiper/css/navigation';
import 'swiper/css';

export function HeroSwiper(): JSX.Element {

  const isLoading = useSelector((state: RootState) => state.data.isBeersDataLoading);
  const beers = useSelector((state: RootState) => state.data.beers);

  return (

      isLoading ? <Spinner wrapper size={'80'}/> :
      <div className='hero__wrapper beer'>
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
                <BeerItemPreview item={item} showStatus={true} className="hero__swipe"/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='hero__swiper-buttons beer__buttons'>
          <button className='beer__btn beer__btn--prev' type="button">
            <span className='visually-hidden'>previous slide</span>
          </button>
          <button className='beer__btn beer__btn--next' type="button">
            <span className='visually-hidden'>next slide</span>
          </button>
        </div>
      </div>

  )
}
