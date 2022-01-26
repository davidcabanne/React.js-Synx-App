import React, { useState } from "react";
import "./Nav.css";

const Nav = () => {
  // const [toggleBurgerActive, setToggleBurgerActive] = useState(false);
  // const toggleBurger = () => setToggleBurgerActive((oldValue) => !oldValue);
  return (
    <header className="bloc__container flex__ctr">
      <nav className="bloc__wrapper flex__ctr flex__row">
        <a href="#">
          <img className="nav__logo" src="/assets/logo-synx.svg" />
        </a>

        <ul className="nav__links flex__ctr">
          <li className="nav__links--icon">How it works</li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
