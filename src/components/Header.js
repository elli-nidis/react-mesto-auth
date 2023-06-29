import { NavBar } from "./NavBar";
import logo from '../images/header-logo.svg';

function Header({isLoggedIn, handleLogOut}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      {<NavBar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut}/>}
    </header>
  );
}

export {Header};