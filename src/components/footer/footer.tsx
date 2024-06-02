export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <span className="footer__logo-part footer__logo-part--1">BR</span>
        <span className="footer__logo-part footer__logo-part--2">AGA</span>
        <span className="footer__logo-part footer__logo-part--3">ewery</span>
      </div>
      <address className="footer__text footer__address">Peer St, Haifa, IL</address>
      <a className="footer__text footer__phone" href="tel:0543955573">
        <span className="visually-hidden">Call us</span>
        +972 54 3955573
      </a>
      <p className="footer__text footer__copyrights">©2024 Alex Gorodov, All Rights Reserved</p>
    </footer>
  )
}
