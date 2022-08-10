import React from 'react'
import Photo from '../../images/vitaliy.png'
import PhotoTest from '../../images/imgForTesting.jpg'
import Avatar from '../../images/ava.PNG'


export default function AboutMe(props) {
  return (
    <div className='aboutMe__container'>
      {props.children}
      <div className='aboutMe__body'>
        <div className='aboutMe__info'>
          <h2 className='aboutMe__title'>Наталья</h2>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__details'>
            Я живу в Воронеже, закончила факультет иностранных языков ВГПУ. Работала в службе поддержки 1-го уровня с 
            иностранными клиентами, решила посмотреть на процесс с другой стороны, поэтому недавно начала кодить. 
          </p>
          <ul className='aboutMe__social-list'>
            <li className='aboutMe__social-item'><a className='aboutMe__social-link' href='#'>Facebook</a></li>
            <li className='aboutMe__social-item'>
              <a className='aboutMe__social-link' href='https://github.com/NataSmit' target='blank'>Github</a>
            </li>
          </ul>
        </div>
        <div className='aboutMe__photo-container'>
          <img className='aboutMe__photo-item' src={Avatar} alt='Фото студента'/>
        </div>
      </div>
      <div className='aboutMe__portfolio'>
        <p className='aboutMe__portfolio-title'>Портфолио</p>
        <ul className='aboutMe__portfolio-list'>
          <a className='aboutMe__portfolio-link' href='https://github.com/NataSmit/how-to-learn' target='blank'>
            <li className='aboutMe__portfolio-item'>
              Статичный сайт
            <div className='aboutMe__portfolio-arrow'></div>
            </li>
          </a>
          <a className='aboutMe__portfolio-link' href='https://github.com/NataSmit/russian-travel' target='blank'>
            <li className='aboutMe__portfolio-item'>
              Адаптивный сайт
            <div className='aboutMe__portfolio-arrow'></div>
            </li>
          </a>
          <a className='aboutMe__portfolio-link' href='https://github.com/NataSmit/react-mesto-api-full' target='blank'>
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
