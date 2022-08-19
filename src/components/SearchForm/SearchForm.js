import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {useState} from 'react';
import { useEffect } from 'react';

export default function SearchForm({onSearchBtn}) {

  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function submitSearch(e) {
    e.preventDefault();
    onSearchBtn(value);
  }



  return (
    <div className='searchForm' >
      <form className='searchForm__form' onSubmit={submitSearch}>
        <input className='searchForm__input' type='text' value={value || ''} onChange={handleChange} placeholder='Фильм' required/>
        <button className='searchForm__button'></button>
      </form>
      <FilterCheckbox />
    </div>
  )
}
