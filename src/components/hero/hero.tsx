import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ReactComponent as Star} from '../../img/icons/star.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { beers } from '../../mocks/beers';
import { useState } from 'react';
import cn from 'classnames'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/actions';

export function Hero(): JSX.Element {
  const [isCartBtnShown, setCartBtnShown] = useState(false);
  const cartButtonClassName = cn("button__wrapper", {
    "button__wrapper--active" : isCartBtnShown,
  })

  const dispatch = useDispatch();

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
      <div className="hero__wrapper swiper-custom"
        onMouseEnter={() => setCartBtnShown(true)}
        onMouseLeave={() => setCartBtnShown(false)}
      >
        {
          <Swiper
            loop={true}
            spaceBetween={30}
            navigation={{
              prevEl: '.swiper-custom__btn--prev',
              nextEl: '.swiper-custom__btn--next'
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
              <SwiperSlide>
                <div className="hero__swipe swiper-custom__item">
                  <div className={cartButtonClassName}>
                    <button className="button swiper-custom__cart-btn" onClick={() => dispatch(addItemToCart({item}))}>Add to cart</button>
                  </div>
                  <img className="swiper-custom__item-image" src={item.img} alt="" width={135} height={463} />
                  <div className='swiper-custom__item-wrapper'>
                    <div>
                      <p className="swiper-custom__item-name swiper-custom__item-accent">
                        {item.name}
                      </p>
                      {item.categories.map((c) => (
                        item.categories.indexOf(c) < item.categories.length - 1? c + ', ' : c + ''
                      ))}
                    </div>
                    <p className="swiper-custom__item-accent">
                    ₪ {item.price}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        }
        <div className="hero__swiper-buttons swiper-custom__buttons">
          <button className="swiper-custom__btn swiper-custom__btn--prev">
            <span className="visually-hidden">previous slide</span>
          </button>
          <button className="swiper-custom__btn swiper-custom__btn--next">
            <span className="visually-hidden">next slide</span>
          </button>
        </div>
      </div>
    </div>
  )
}
