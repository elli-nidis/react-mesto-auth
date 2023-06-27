import React from "react";
import { Link } from "react-router-dom";
import { Sign } from "./Sign";

function Register() {
  return (
    <Sign 
    title="Регистрация"
    buttonName="Зарегистрироваться"
    children={
      <p className="sign__text">Уже зарегистрированы? 
        <Link to="/sign-in" className="sign__link"> Войти</Link>
      </p>
    }
    />
  );
}

export {Register};