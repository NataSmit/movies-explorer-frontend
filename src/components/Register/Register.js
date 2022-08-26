import React from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import {useState, useCallback} from 'react';
import { useEffect } from 'react';
import {validators, validateInputs} from '../../utils/validation'

export default function Register({children, onRegisterBtn, serverError}) {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const{name, email, password} = formValues
  const [errors, setErrors] = useState({
    name: {
      required: false,  // true -ошибка есть
      nameFormat: false
    },
    email: {
      required: false,
      emailFormat: false
    },
    password: {
      required: false
    }
  })
  const isNameInvalid = Object.values(errors.name).some(Boolean)
  const isEmailInvalid = Object.values(errors.email).some(Boolean)
  const isPasswordInvalid = Object.values(errors.password).some(Boolean)
  const isSubmitBtnDisabled = isNameInvalid || isEmailInvalid || isPasswordInvalid
  

  useEffect(() => {
    validateInputs(validators, name, email, password, setErrors)
  }, [formValues, setErrors])
  

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterBtn(name, email, password)
  }

  const handleInputChange = useCallback((e) => {
    const {name, value} = e.target;
    console.log(e.target)
    setFormValues(prevState => ({...prevState, [name]: value}))
  }, [setFormValues])



  return (
    <div className='register'>
      {children}
      <main className='register__body'>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__lable'>Имя</label>
          <input className='register__input' value={name} name='name' onChange={handleInputChange} required minLength='2' maxLength='30'></input>
          <span className='register__errorMessage register__errorMessage_small'>
            {errors.name.required && 'Это обязательное поле'}<React.Fragment><br/></React.Fragment>
            {errors.name.nameFormat && 'Поле name содержит только латиницу, кириллицу, пробел или дефис'}
          </span>
          <label className='register__lable'>E-mail</label>
          <input className='register__input' value={email} name='email' onChange={handleInputChange} type='email' required></input>
          <span className='register__errorMessage register__errorMessage_small'>
            {errors.email.required && 'Это обязательное поле'}<React.Fragment><br/></React.Fragment>
            {errors.email.emailFormat && 'Электронная почта не валидна'}
          </span>
          <label className='register__lable' required minLength='3'>Пароль</label>
          <input className='register__input' value={password} name='password' onChange={handleInputChange} type='password'></input>
          <span className='register__errorMessage'>
            {errors.password.required && 'Это обязательное поле'}
          </span>
          
          {serverError.failed &&  <span className='register__errorMessage register__errorMessage_small'>{serverError.message}</span>}
          <SubmitButton name={'Зарегистрироваться'} isSubmitBtnDisabled={isSubmitBtnDisabled}/>
          <Link to='/signin' className='register__link'>Уже зарегистрированы? <span className='register__link_modifyed'>Войти</span></Link>
        </form>
      </main>
    </div>
  )
}
