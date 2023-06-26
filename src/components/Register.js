import React from "react";
import { Link } from "react-router-dom";
import { Sign } from "./Sign";

function Register() {
  return (
    <Sign 
    title="Регистрация"
    buttonName="Зарегистрироваться"
    children={
      <p>Уже зарегистрированы? 
        <Link to="/sign-in">Войти</Link>
      </p>
    }
    />
  );
}

export {Register};