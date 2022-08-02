import React from 'react'

export default function AboutProject(props) {
  return (
    <div className='aboutProject__container'>
      {props.children}
      <div className='aboutProject__body'>
        <div className='aboutProject__info'>
          <p className='aboutProject__fact'>Дипломный проект включал 5 этапов</p>
          <p className='aboutProject__details'>Составление плана, работу над бэкендом, вёрстку, добавление 
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutProject__info'>
          <p className='aboutProject__fact'>На выполнение диплома ушло 5 недель</p>
          <p className='aboutProject__details'>У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='aboutProject__timetable'>
        <div className='aboutProject__term'>1 неделя</div>
        <div className='aboutProject__term aboutProject__term_type_front'>4 недели</div>
        <p className='aboutProject__app'>Back-end</p>
        <p className='aboutProject__app'>Front-end</p>
      </div>
    </div>
  )
}
