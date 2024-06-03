import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Autoplay, Navigation } from "swiper/modules";
import { BeerItem } from "../beer-item/beer-item";
import { useIsMobile } from "../../hooks/isMobile";
import { Spinner } from "../spinner/spinner";

export function SwiperClassics(): JSX.Element {
  const items = useSelector((state: RootState) => state.data.beers);
  const isMobile = useIsMobile();

  return (
    <section className="section section--swiper">
      <div className="container">
        <h2 className="title title--2">Our unrivaled classics</h2>
        <Link className="button" to={AppRoute.Shop}>Order now</Link>
      </div>
      {
        items.length ?
        <div className="container container--swiper">
          <Swiper
            wrapperClass="swiper__classics"
            loop={true}
            navigation={{
              prevEl: '.beer__btn--prev',
              nextEl: '.beer__btn--next'
            }}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 2000
            }}
            speed={1000}
            slidesPerView={isMobile ? 2 : 4}
            slidesPerGroup={1}
          >
            {
              items.map((item) => {
                return (
                  <SwiperSlide key={`classic-swipe-${item.id}`}>
                    <BeerItem item={item} showStatus={false} small={true} className="swiper__slide--classics"/>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <div className='beer__buttons beer__buttons--classics'>
            <button className='beer__btn beer__btn--prev'>
              <span className='visually-hidden'>previous slide</span>
            </button>
            <button className='beer__btn beer__btn--next'>
              <span className='visually-hidden'>next slide</span>
            </button>
          </div>
        </div>
        : <Spinner size={"40"}/>
      }
    </section>
  )
}
