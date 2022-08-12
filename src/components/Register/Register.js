import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';

export default function Register(props) {
  return (
    <div className='register'>
      {props.children}
      <main className='register__body'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <label className='register__lable'>Имя</label>
          <input className='register__input' required='true' minLength='2' maxLength='30'></input>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' type='email' required='true'></input>
          <label className='register__lable' required='true' minLength='3'>Пароль</label>
          <input className='register__input' type='password'></input>
          <span className='register__errorMessage'>Что-то пошло не так...</span>
          
          <SubmitButton name={'Зарегистрироваться'}/>
          <Link to='/signin' className='register__link'>Уже зарегистрированы? <span className='register__link_modifyed'>Войти</span></Link>
        </form>
      </main>
    </div>
  )
}
