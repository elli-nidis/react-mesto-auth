import React from "react";

function Sign({title, buttonName, children}) {
  return (
    <div className="content">
      <section className="sign">
        <h2>{title}</h2>
        <form className="sign__form" name="sign-form">
          <input className="sign__input" type="email" name="email" placeholder="Email" required />
          <input className="sign__input" type="password" name="password" placeholder="Пароль" required />
          <button className="sign__button" type="submit" aria-label={`кнопка ${buttonName}`}>{buttonName}</button>
        </form>
        {children}
      </section>
    </div>
  );
}

export {Sign};