import React from 'react';
import { useEffect } from 'react';
import {useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {validators, validateInputs} from '../../utils/validation'

export default function Profile({onExitBtn, children, handleUserUpdate, serverError}) {

  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser)

  const [active, setActive] = useState(false);
  const disabled = false;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nameInput = useRef();
  const emailInput = useRef();
  

  function editProfile () {
    setActive(true);
    nameInput.current.removeAttribute('disabled');
    emailInput.current.removeAttribute('disabled');
  }
  
  function changeName(e) {
    setName(e.target.value)
  }

  function changeEmail(e) {
    setEmail(e.target.value)
  }

  function haandleLogout() {
    onExitBtn()
  }

 
  function handleFormSubmit (e) {
    e.preventDefault()
    handleUserUpdate(email, name)
    setActive(false)
  }

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [])

  return (

    <div className='profile'>
      {children}
      <main className='profile__body'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleFormSubmit}>
          <div className='profile__input-container'>
            <label htmlFor='name' className='profile__lable'>Имя</label>
            <input onChange={changeName} className='profile__input' id='name' value={name} disabled ref={nameInput}/>
          </div>
          <div className='profile__input-container profile__input-container_type_no-border'>
            <label htmlFor='email' className='profile__lable'>E-mail</label>
            <input onChange={changeEmail} className='profile__input' id='email' value={email} disabled ref={emailInput}/>
          </div>
          <div className='profile__submit-container'>
            <span className={`profile__errorMessage ${disabled ? 'profile__errorMessage_visible' : ''}`}>При обновлении профиля произошла ошибка.</span>
            {serverError.failed &&  <span className='register__errorMessage register__errorMessage_small'>{serverError.message}</span>}
            <button className={`profile__submit-btn ${disabled ? 'profile__submit-btn_disabled' : ''} ${active ? 'profile__submit-btn_visible' : ''}`}>Сохранить</button>
          </div>     
        </form>
        <div className={`profile__buttons ${active ? 'profile__buttons_hidden' : ''}`}>
          <button className='profile__edit-btn' type='button' onClick={editProfile}>Редактировать</button>
          <button type='button' onClick={haandleLogout} className='profile__exit'>Выйти из аккаунта</button>
        </div>
      </main>
    </div>
  )
}
