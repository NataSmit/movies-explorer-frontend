import { React, useState, useRef } from 'react';

export default function Profile(props) {

  const [active, setActive] = useState(false);
  const nameInput = useRef();
  const emailInput = useRef();
  console.log(nameInput.current)
  console.log(emailInput.current)

  function editProfile () {
    setActive(true);
    nameInput.current.removeAttribute('disabled');
    emailInput.current.removeAttribute('disabled');
  }

  return (

    <div className='profile'>
      {props.children}
      <main className='profile__body'>
        <h1 className='profile__header'>Привет, Виталий!</h1>
        <form className='profile__form'>
          <div className='profile__input-container'>
            <label for='name' className='profile__lable'>Имя</label>
            <input className='profile__input' id='name' value={'Виталий'} disabled ref={nameInput}/>
          </div>
          <div className='profile__input-container'>
            <label for='email' className='profile__lable'>E-mail</label>
            <input className='profile__input' id='email' value={'pochta@yandex.ru'} disabled ref={emailInput}/>
          </div>
          <button className={`profile__submit-btn profile__submit-btn_disabled ${active ? 'profile__submit-btn_visible' : ''}`}>Сохранить</button>
        </form>
        <div className={`profile__buttons ${active ? 'profile__buttons_hidden' : ''}`}>
          <button className='profile__edit-btn' type='button' onClick={editProfile}>Редактировать</button>
          <p className='profile__exit'>Выйти из аккаунта</p>
        </div>
      </main>
    </div>
  )
}
