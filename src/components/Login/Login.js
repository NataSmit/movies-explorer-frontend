import React, {useState} from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';

export default function Login({children, onLoginBtn}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoginBtn(email, password)
  }


  return (
    <div className='register'>
      {children}
      <main className='register__body'>
        <h1 className='register__title'>Рады видеть!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' value={email} onChange={handleEmailChange} type='email' required></input>
          <label className='register__lable'>Пароль</label>
          <input className='register__input' value={password} onChange={handlePasswordChange} type='password' required minLength='3'></input>
          <span className='register__errorMessage register__errorMessage_modified'>test</span>
          <SubmitButton name={'Войти'}/>
          <Link to='/signup' className='register__link'>Ещё не зарегистрированы? <span className='register__link_modifyed'>Регистрация</span></Link>
        </form>
      </main>
    </div>
  )
}
