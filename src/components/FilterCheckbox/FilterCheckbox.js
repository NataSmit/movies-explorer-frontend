import React from 'react'

export default function FilterCheckbox() {
  return (
    <div className='filterCheckbox'>
      <div className='filterCheckbox__container'>
        <input className='filterCheckbox__input' type='checkbox' id='shortFilm'/>
        <label htmlFor='shortFilm' className='filterCheckbox__label filterCheckbox__label_active'>Короткометражки</label>
      </div>
    </div>
  )
}
