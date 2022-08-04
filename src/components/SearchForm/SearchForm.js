import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <div className='searchForm'>
      <form className='searchForm__form'>
        <input className='searchForm__input' placeholder='Фильм'/>
        <button className='searchForm__button'></button>
      </form>
      <FilterCheckbox />
    </div>
  )
}
