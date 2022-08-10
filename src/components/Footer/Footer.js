import React from 'react'

export default function Footer() {
  return (
    <footer className='footer__container'>
      <p className='footer__project'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__social'>
        <p className='footer__copyright'>&copy;{new Date().getFullYear()}</p>
        <ul className='footer__source-list'>
          <li className='footer__source-item'>
            <a className='footer__source-link' href='https://practicum.yandex.ru/' target='blank'>Яндекс.Практикум</a>
          </li>
          <li className='footer__source-item'>
            <a className='footer__source-link' href='https://github.com' target='blank'>Github</a>
          </li>
          <li className='footer__source-item'>
            <a className='footer__source-link' href='https://facebook.com' target='blank'>Facebook</a>
          </li>
        </ul>
      </div>

    </footer>
  )
}
