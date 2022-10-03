export const validators = {
  name: {
    required: (value) => { return value === ''}, // true - there's an error
    nameFormat:(value) => { return !/^[A-Za-zА-яё -]+$/.test(value)}
  },
  email: {
    required: (value) => { return value === ''},
    emailFormat: (value) => { return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value)}
  },
  password: {
    required: (value) => { return value === ''},
  }
}

export const validateInputs = (validators, name, email, password, func) => {
  const nameValidationResult = Object.keys(validators.name).map((errorKey) => {
    const errorResult = validators.name[errorKey](name)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
    const errorResult = validators.email[errorKey](email)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  const passwordValidationResult = Object.keys(validators.password).map((errorKey) => {
    const errorResult = validators.password[errorKey](password)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  func({
    name: nameValidationResult,
    email: emailValidationResult,
    password: passwordValidationResult
  })
}

export const loginValidators = {
  email: {
    required: (value) => { return value === ''},
    emailFormat: (value) => { return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value)}
  },
  password: {
    required: (value) => { return value === ''},
  }
}

export const validateLoginInputs = (validators, email, password, func) => {

  const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
    const errorResult = validators.email[errorKey](email)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  const passwordValidationResult = Object.keys(validators.password).map((errorKey) => {
    const errorResult = validators.password[errorKey](password)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  func({
    email: emailValidationResult,
    password: passwordValidationResult
  })
}

export const profileValidators = {
  name: {
    required: (value) => { return value === ''}, // true - there's an error
    nameFormat:(value) => { return !/^[A-Za-zА-яё -]+$/.test(value)},
  },
  email: {
    required: (value) => { return value === ''},
    emailFormat: (value) => { return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value)}
  }
}

export const profileValidateInputs = (validators, name, email, func) => {
  const nameValidationResult = Object.keys(validators.name).map((errorKey) => {
    const errorResult = validators.name[errorKey](name)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})

  const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
    const errorResult = validators.email[errorKey](email)
    return {[errorKey]: errorResult}
  }).reduce((acc, el) => ({...acc, ...el}), {})


  func({
    name: nameValidationResult,
    email: emailValidationResult
  })
}