import React from 'react'
import headerLogo from '../../images/header-logo.svg'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <a href='#'><img className='header__logo' alt='Логотип' src={headerLogo}/></a>
        <div className='header__buttons'>
          <button className='header__registration-btn'>Регистрация</button>
          <button className='header__login-btn'>Войти</button>
        </div>
      </div>
    </header>
  )
}
