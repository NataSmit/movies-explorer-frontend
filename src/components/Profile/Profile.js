import { React, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Profile(props) {

  const [active, setActive] = useState(false);
  const disabled = false;
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const nameInput = useRef();
  const emailInput = useRef();
  console.log(name)
  console.log(emailInput.current)
  console.log(disabled)

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

  return (

    <div className='profile'>
      {props.children}
      <main className='profile__body'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <form className='profile__form'>
          <div className='profile__input-container'>
            <label htmlFor='name' className='profile__lable'>Имя</label>
            <input onChange={changeName} className='profile__input' id='name' value={name} disabled ref={nameInput}/>
          </div>
          <div className='profile__input-container'>
            <label htmlFor='email' className='profile__lable'>E-mail</label>
            <input onChange={changeEmail} className='profile__input' id='email' value={email} disabled ref={emailInput}/>
          </div>
          <div className='profile__submit-container'>
            <span className={`profile__errorMessage ${disabled ? 'profile__errorMessage_visible' : ''}`}>При обновлении профиля произошла ошибка.</span>
            <button className={`profile__submit-btn ${disabled ? 'profile__submit-btn_disabled' : ''} ${active ? 'profile__submit-btn_visible' : ''}`}>Сохранить</button>
          </div>
          
        </form>
        <div className={`profile__buttons ${active ? 'profile__buttons_hidden' : ''}`}>
          <button className='profile__edit-btn' type='button' onClick={editProfile}>Редактировать</button>
          <Link to='/movies' className='profile__exit'>Выйти из аккаунта</Link>
        </div>
      </main>
    </div>
  )
}
