import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Menu({isMenuOpen, closeMenu}) {
  

  return (
    <div className={`menu ${isMenuOpen ? 'menu_opened' : ''}`}>
      <nav className='menu__container'>
      <button className='menu__close-btn' type='button' onClick={() => closeMenu()}></button>
        <ul className='menu__list'>
          <li className='menu__list-item'>
            <Link to='/' className='menu__list-link'>Главная</Link>
          </li>
          <li className='menu__list-item'>
            <NavLink to='/movies' activeClassName='menu__list-item_active' className='menu__list-link'>Фильмы</NavLink>
          </li>
          <li className='menu__list-item'>
            <NavLink to='/saved-movies' activeClassName='menu__list-item_active' className='menu__list-link'>Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <div className='menu__account-container'>
          <button className='menu__account' type='button'>Аккаунт</button>
        </div>
      </nav>

    </div>
  )
}
