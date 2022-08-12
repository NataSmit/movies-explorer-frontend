import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';

export default function Login(props) {
  return (
    <div className='register'>
      {props.children}
      <main className='register__body'>
        <h1 className='register__title'>Рады видеть!</h1>
        <form className='register__form'>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' type='email' required='true'></input>
          <label className='register__lable'>Пароль</label>
          <input className='register__input' type='password' required='true' minLength='3'></input>
          <span className='register__errorMessage register__errorMessage_modified'>test</span>
          <SubmitButton name={'Войти'}/>
          <Link to='/signup' className='register__link'>Ещё не зарегистрированы? <span className='register__link_modifyed'>Регистрация</span></Link>
        </form>
      </main>
    </div>
  )
}
