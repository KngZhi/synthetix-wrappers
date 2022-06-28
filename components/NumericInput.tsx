import { FC, KeyboardEvent, ChangeEvent } from 'react'
import styled from 'styled-components'

type NumberInputProps = {
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  max?: number
  decimal?: string
  disabled?: boolean
  placeholder?: string
}

const NumericInput: FC<NumberInputProps> = ({
  max = 60,
  value,
  onChange,
  disabled = false,
  placeholder = ''
}) => {
  function validate(e: KeyboardEvent<HTMLInputElement>) {
    const theEvent = e || window.event
    const key = theEvent.key

    const regex = /[0-9]|\./
    if (!regex.test(key)) {
      if (theEvent.preventDefault) theEvent.preventDefault()
    }
  }

  return (
    <BaseInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      max={max}
      onKeyPress={validate}
      disabled={disabled}
    />
  )
}

const BaseInput = styled.input`
    /* Remove default styling */
    width: 50%;
    height: 100%;

    / * Remove default styling */
    padding: 0;
	background: none;
	border: none;
	border-radius: 0;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

    /* Text */
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    color: #FFFFFF;
    text-align: right;
`

export default NumericInput
