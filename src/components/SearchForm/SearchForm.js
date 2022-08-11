import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({saved}) {
  return (
    <div className={`searchForm ${saved ? 'searchForm_type_with-border' : ''}`}>
      <form className='searchForm__form'>
        <input className='searchForm__input' placeholder='Фильм'/>
        <button className='searchForm__button'></button>
      </form>
      <FilterCheckbox />
    </div>
  )
}
