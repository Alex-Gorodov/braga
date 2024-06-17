import { ReactComponent as Whatsapp } from '../../img/icons/whatsapp.svg'
import { ReactComponent as Telegram } from '../../img/icons/telegram.svg'
import { ReactComponent as Phone } from '../../img/icons/phone.svg'

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <span className="footer__logo-part footer__logo-part--1">BR</span>
        <span className="footer__logo-part footer__logo-part--2">AGA</span>
        <span className="footer__logo-part footer__logo-part--3">ewery</span>
      </div>
      <address className="footer__text footer__address">Peer St, Haifa, IL</address>
      <div className="footer__contacts">
        <a className="footer__link" href="tel:0543955573">
          <span className="visually-hidden">Call us</span>
          <Phone/>
        </a>
        <a className="footer__link" href="https://wa.me/972543955573" target="_blank" rel="noreferrer">
          <span className="visually-hidden">Whatsapp</span>
          <Whatsapp/>
        </a>
        <a className="footer__link" href="https://t.me/a_gorodov" target="_blank" rel="noreferrer">
          <span className="visually-hidden">Telegram</span>
          <Telegram/>
        </a>
      </div>
      <p className="footer__text footer__copyrights">©2024 Alex Gorodov, All Rights Reserved</p>
    </footer>
  )
}
