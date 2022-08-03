import React from 'react'
import Photo from '../../images/vitaliy.png'
import PhotoTest from '../../images/imgForTesting.jpg'

export default function AboutMe(props) {
  return (
    <div className='aboutMe__container'>
      {props.children}
      <div className='aboutMe__body'>
        <div className='aboutMe__info'>
          <h2 className='aboutMe__title'>Виталий</h2>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__details'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className='aboutMe__social-list'>
            <li className='aboutMe__social-item'><a className='aboutMe__social-link' href='#'>Facebook</a></li>
            <li className='aboutMe__social-item'><a className='aboutMe__social-link' href='#'>Github</a></li>
          </ul>
        </div>
        <div className='aboutMe__photo-container'>
          <img className='aboutMe__photo-item' src={Photo} alt='Фото студента'/>
        </div>
      </div>
      <div className='aboutMe__portfolio'>
        <p className='aboutMe__portfolio-title'>Портфолио</p>
        <ul className='aboutMe__portfolio-list'>
          <a className='aboutMe__portfolio-link' href='#'>
            <li className='aboutMe__portfolio-item'>
            Статичный сайт
            <div className='aboutMe__portfolio-arrow'></div>
            </li>
          </a>
          <a className='aboutMe__portfolio-link' href='#'>
            <li className='aboutMe__portfolio-item'>
            Адаптивный сайт
            <div className='aboutMe__portfolio-arrow'></div>
            </li>
          </a>
          <a className='aboutMe__portfolio-link' href='#'>
            <li className='aboutMe__portfolio-item'>
            Одностраничное приложение
            <div className='aboutMe__portfolio-arrow'></div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}
