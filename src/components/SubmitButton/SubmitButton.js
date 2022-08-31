import React from 'react'

export default function SubmitButton({name, isSubmitBtnDisabled}) {

  return (
    <button disabled={isSubmitBtnDisabled} className='submitButton'>{name}</button>
  )
}
