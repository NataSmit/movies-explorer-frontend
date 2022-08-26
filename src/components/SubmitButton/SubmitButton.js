import React from 'react'

export default function SubmitButton({name, isSubmitBtnDisabled}) {
  console.log('isSubmitBtnDisabled btn', isSubmitBtnDisabled)

  return (
    <button disabled={isSubmitBtnDisabled} className='submitButton'>{name}</button>
  )
}
