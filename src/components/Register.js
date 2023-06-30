import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth';
// import successImg from '../images/success.svg';

function Register({onRegister}) {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formValue;
    auth.register(email, password)
      .then(res => {
        if(res) {
          onRegister({imgLink: 'success', text: 'Вы успешно зарегистрировались!', name: 'Успешная регистрация'});
          navigate('/sign-in', {replace: true});
        }
        else onRegister({imgLink: 'failure', text: 'Что-то пошло не так! Попробуйте ещё раз.', name: 'Неудачная регистрация'});
      });  
  };

  return (
    <div className="content">
      <section className="sign">
        <h2 className="sign__title">Регистрация</h2>
        <form className="sign__form" onSubmit={handleSubmit} name="sign-form">
          <input className="sign__input" type="email" name="email" value={formValue.email} onChange={handleChange} placeholder="Email" required />
          <input className="sign__input" type="password" name="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" required />
          <button className="sign__button" type="submit" aria-label="кнопка Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <p className="sign__text">Уже зарегистрированы? 
          <Link to="/sign-in" className="sign__link"> Войти</Link>
        </p>
      </section>
    </div>
  );
}

export {Register};