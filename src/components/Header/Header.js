import React from 'react'
import headerLogo from '../../images/header-logo.svg'

export default function Header({loggedIn}) {
  return (
    <header className={`header ${loggedIn ? 'header_theme_dark' : ''}`}>
      <div className='header__container'>
        <a href='#'><img className='header__logo' alt='Логотип' src={headerLogo}/></a>
        <nav className={`header__menu ${loggedIn ? 'header__menu_visible' : ''}`}>
          <ul className='header__list'>
            <li className='header__list-item'>Фильмы</li>
            <li className='header__list-item'>Сохранённые фильмы</li>
          </ul>
        </nav>
        <div className='header__account-container'>
          <button className={`header__account ${loggedIn ? 'header__account_visible' : ''}`}>Аккаунт</button>
        </div>
        <div className={`header__buttons ${loggedIn ? 'header__buttons_hidden' : ''}`}>
          <button className='header__registration-btn'>Регистрация</button>
          <button className='header__login-btn'>Войти</button>
        </div>
      </div>
    </header>
  )
}
