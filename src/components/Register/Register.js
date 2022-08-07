import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function Register(props) {
  return (
    <div className='register'>
      {props.children}
      <main className='register__body'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <label className='register__lable'>Имя</label>
          <input className='register__input'></input>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' type='email'></input>
          <label className='register__lable'>Пароль</label>
          <input className='register__input' type='password'></input>
          <span className='register__errorMessage'>Что-то пошло не так...</span>
          <SubmitButton name={'Зарегистрироваться'}/>
          <p className='register__link'>Уже зарегистрированы? Войти</p>
        </form>
      </main>
    </div>
  )
}
