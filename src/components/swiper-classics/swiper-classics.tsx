import { BeerItemPreview } from "../beer-item/beer-item-preview";
import { useIsDesktop, useIsMobile } from "../../hooks/useSizes";
import { Autoplay, Navigation } from "swiper/modules";
import { RootState } from "../../store/root-reducer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "../spinner/spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function SwiperClassics(): JSX.Element {
  const items = useSelector((state: RootState) => state.data.beers);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  return (
    <section className="section section--swiper">
      <div className="container">
        <div className="container__wrapper">
          <h2 className="title title--2">Our unrivaled classics</h2>
          <Link className="button" to={AppRoute.Shop}>Order now</Link>
        </div>
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
            slidesPerView={isMobile ? 2 : isDesktop ? 3 : 4}
            slidesPerGroup={1}
          >
            {
              items.map((item) => {
                return (
                  <SwiperSlide key={`classic-swipe-${item.id}`}>
                    <BeerItemPreview item={item} showStatus={false} small={true} className="swiper__slide--classics"/>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <div className='beer__buttons beer__buttons--classics'>
            <button className='beer__btn beer__btn--prev' type="button">
              <span className='visually-hidden'>previous slide</span>
            </button>
            <button className='beer__btn beer__btn--next' type="button">
              <span className='visually-hidden'>next slide</span>
            </button>
          </div>
        </div>
        : <Spinner size={"40"} wrapper/>
      }
    </section>
  )
}
