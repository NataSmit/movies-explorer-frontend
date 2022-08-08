import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function Login(props) {
  return (
    <div className='register'>
      {props.children}
      <main className='register__body'>
        <h1 className='register__title'>Рады видеть!</h1>
        <form className='register__form'>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' type='email'></input>
          <label className='register__lable'>Пароль</label>
          <input className='register__input' type='password'></input>
          <span className='register__errorMessage'></span>
          <SubmitButton name={'Войти'}/>
          <span className='register__link'>Ещё не зарегистрированы? <span className='register__link_modifyed'>Регистрация</span></span>
        </form>
      </main>
    </div>
  )
}
