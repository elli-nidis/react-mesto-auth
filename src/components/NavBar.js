import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar({isLoggedIn, handleLogOut, email}) {

  const navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('token');
    handleLogOut();
    navigate('/sign-in', {replace: true});
  }

  return (
    <nav>
      <ul className="menu">
        {isLoggedIn ?
          (<>
            <li className="menu__link menu__link_type_large">{email}</li>
            <li className="menu__link"><Link to="/sign-in" className="menu__link menu__link_type_dark" onClick={logOut} >Выйти</Link></li>
          </>)
        : (<>
            <li><NavLink to="/sign-up" className={({isActive}) => `menu__link ${isActive ? "menu__link_hidden" : ""}`}>Регистрация</NavLink></li>
            <li><NavLink to="/sign-in" className={({isActive}) => `menu__link ${isActive ? "menu__link_hidden" : ""}`}>Войти</NavLink></li>
          </>)
        }
    </ul>      

    </nav>
  );
}

export {NavBar};