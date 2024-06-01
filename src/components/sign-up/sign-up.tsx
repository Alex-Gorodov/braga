import { SignUpForm } from "./sign-up-form";

export function SignUp(): JSX.Element {
  return (
    <section className="section__container sign-up">
      <article className="sign-up__container">
        <p className='hero__text hero__text--centered'>
          <span className='hero__text hero__text--bold'>Sign</span> up to our <span className='hero__text hero__text--bold'>newsletter</span>
        </p>
        <p className="sign-up__description">Subscribe to our newsletter to be the first to know about new products and special offers. We promise: no endless spam, just important and interesting updates. Stay tuned!</p>
        <SignUpForm/>
      </article>
      <article className="sign-up__container">
        <img className="sign-up__image" src="/braga/img/sign-up-beers.png" alt="" width={326} height={300}/>
      </article>
    </section>
  )
}
