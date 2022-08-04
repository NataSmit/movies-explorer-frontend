import React from 'react'

export default function FilterCheckbox() {
  return (
    <div className='filterCheckbox'>
      <input className='filterCheckbox__input' type='checkbox' id='shortFilm'/>
      <label for='shortFilm'>Короткометражки</label>
    </div>
  )
}
