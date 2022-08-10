import React from 'react'

export default function Menu({isMenuOpen, closeMenu}) {
  

  return (
    <div className={`menu ${isMenuOpen ? 'menu_opened' : ''}`}>
      <nav className='menu__container'>
      <button className='menu__close-btn' type='button' onClick={() => closeMenu()}></button>
        <ul className='menu__list'>
          <li className='menu__list-item'>Главная</li>
          <li className='menu__list-item'>Фильмы</li>
          <li className='menu__list-item'>Сохранённые фильмы</li>
        </ul>
        <div className='menu__account-container'>
          <button className='menu__account' type='button'>Аккаунт</button>
        </div>
      </nav>

    </div>
  )
}
