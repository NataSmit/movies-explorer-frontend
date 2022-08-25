import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import {useState} from 'react';

export default function Register({children, onRegisterBtn}) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterBtn(name, email, password)
  }

  return (
    <div className='register'>
      {children}
      <main className='register__body'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__lable'>Имя</label>
          <input className='register__input' value={name} onChange={handleNameChange} required minLength='2' maxLength='30'></input>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' value={email} onChange={handleEmailChange} type='email' required></input>
          <label className='register__lable' required minLength='3'>Пароль</label>
          <input className='register__input' value={password} onChange={handlePasswordChange} type='password'></input>
          <span className='register__errorMessage'>Что-то пошло не так...</span>
          
          <SubmitButton name={'Зарегистрироваться'}/>
          <Link to='/signin' className='register__link'>Уже зарегистрированы? <span className='register__link_modifyed'>Войти</span></Link>
        </form>
      </main>
    </div>
  )
}
