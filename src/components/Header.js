import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
    </header>
  );
}

export {Header};