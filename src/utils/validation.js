module.exports.validators = {
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

module.exports.validateInputs = (validators, name, email, password, func) => {
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

module.exports.loginValidators = {
  email: {
    required: (value) => { return value === ''},
    emailFormat: (value) => { return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value)}
  },
  password: {
    required: (value) => { return value === ''},
  }
}

module.exports.validateLoginInputs = (validators, email, password, func) => {

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

module.exports.profileValidators = {
  name: {
    required: (value) => { return value === ''}, // true - there's an error
    nameFormat:(value) => { return !/^[A-Za-zА-яё -]+$/.test(value)}
  },
  email: {
    required: (value) => { return value === ''},
    emailFormat: (value) => { return !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value)}
  }
}

module.exports.profileValidateInputs = (validators, name, email, func) => {
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