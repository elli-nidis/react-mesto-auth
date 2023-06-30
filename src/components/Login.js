import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../utils/auth';

function Login({handleLogin}) {

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

    auth.authorize(email, password)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          handleLogin(email);
          setFormValue({
            email: '',
            password: ''
          });
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="content">
      <section className="sign">
        <h2 className="sign__title">Вход</h2>
        <form className="sign__form" onSubmit={handleSubmit} name="sign-form">
          <input className="sign__input" type="email" name="email" value={formValue.email} onChange={handleChange} placeholder="Email" required />
          <input className="sign__input" type="password" name="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" required />
          <button className="sign__button" type="submit" aria-label="кнопка Войти">Войти</button>
        </form>
      </section>
    </div>
  );
}

export {Login};