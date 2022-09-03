import React from 'react'

export default function SubmitButton({name, isSubmitBtnDisabled, processing}) {

  return (
    <button disabled={isSubmitBtnDisabled || processing} className='submitButton'>{name}</button>
  )
}
