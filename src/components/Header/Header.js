import { React, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import Menu from '../Menu/Menu';

export default function Header({loggedIn, minimal}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function openMenu() {
    setIsMenuOpen(true);
    updateBodyStyles();
  }

  function closeMenu() {
    setIsMenuOpen(false);
    updateBodyStyles();
  }

  function updateBodyStyles() {
    if (isMenuOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }
  }

  return (
    <header className={`header ${loggedIn || minimal? 'header_theme_dark' : ''}`}>
      <div className={`header__container ${minimal ? 'header__container_small' : ''}`}>
        <Link to='/'>
          <img className='header__logo' alt='Логотип' src={headerLogo}/>
        </Link>
        <nav className={`header__menu ${loggedIn ? 'header__menu_visible' : ''}`}>
          <ul className='header__list'>
            <li className='header__list-item'>
              <NavLink to='/movies' activeClassName='header__list-item_active' className='header__list-link'>Фильмы</NavLink>
            </li>
            <li className='header__list-item'>
              <NavLink to='/saved-movies' activeClassName='header__list-item_active' className='header__list-link'>Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <div className='header__account-container'>
        <div className={`header__account ${loggedIn ? 'header__account_visible' : ''}`}>
          <NavLink to='/profile' className='header__list-link' activeClassName='header__list-item_active'>
            Аккаунт
          </NavLink>
        </div>
        </div>
        <button className={`header__burger ${loggedIn ? 'header__burger_visible' : ''}`} onClick={openMenu}>
          <span className='header__burger-span'></span>
        </button>
        <div className={`header__buttons ${loggedIn || minimal? 'header__buttons_hidden' : ''}`}>
          <Link to='/signup'>
            <button className='header__registration-btn'>Регистрация</button>
          </Link>
          <Link to='signin'>
            <button className='header__login-btn'>Войти</button>
          </Link>
        </div>
      </div>
      <Menu isMenuOpen={isMenuOpen} closeMenu={closeMenu}/> 
    </header>
  )
}
