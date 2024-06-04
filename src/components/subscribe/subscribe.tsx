import { SubscribeForm } from "./subscribe-form";

export function SignUp(): JSX.Element {
  return (
    <section className="section__container subscribe">
      <article className="subscribe__container">
        <p className='hero__text hero__text--centered'>
          <span className='hero__text hero__text--bold'>Subscribe</span> to our <span className='hero__text hero__text--bold'>newsletter</span>
        </p>
        <p className="subscribe__description">Subscribe to our newsletter to be the first to know about new products and special offers. We promise: no endless spam, just important and interesting updates. Stay tuned!</p>
        <SubscribeForm/>
      </article>
      <article className="subscribe__container">
        <picture>
          <source media="(min-width: 1200px)" srcSet="braga/img/subscribe-beers-desktop.webp 1x, braga/img/subscribe-beers-desktop@2x.webp 2x" type="image/webp"/>
          <source media="(min-width: 768px)" srcSet="braga/img/subscribe-beers-tablet.webp 1x, braga/img/subscribe-beers-tablet@2x.webp 2x" type="image/webp"/>
          <source srcSet="braga/img/subscribe-beers-mobile.webp 1x, braga/img/subscribe-beers-mobile@2x.webp 2x" type="image/webp"/>
          <source media="(min-width: 1200px)" srcSet="braga/img/subscribe-beers-desktop.png 1x, braga/img/subscribe-beers-desktop@2x.png 2x"/>
          <source media="(min-width: 768px)" srcSet="braga/img/subscribe-beers-tablet.png 1x, braga/img/subscribe-beers-tablet@2x.png 2x"/>
          <img className="catalog-card__image" src="braga/img/subscribe-beers-mobile.png" alt="Beer bottles." width="326" height="340" srcSet="braga/img/subscribe-beers-mobile@2x.png 2x"/>
        </picture>
      </article>
    </section>
  )
}
