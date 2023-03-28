import React from 'react'
import { StringValidator } from '../../../validators/string-validator'
import { BaseInput } from '../base-input'
import { useValidatorErrorMessages } from '../base/useValidatorErrorMessages'
import { Input } from './styles'

interface Props {
  label?: string
  type?: "text" | "password"
  validator?: StringValidator
  onChange?(value: string): void
}

export function TextInput(props: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim()

    if (value !== event.target.value && inputRef.current)
      inputRef.current.value = value

    if (props.onChange)
      props.onChange(value)

    if (props.validator)
      props.validator.value = value

    if (props.validator && validated)
      props.validator.Validate()
  }

  return (
    <BaseInput label={props.label} messageErrors={messageErrors}>
      <Input ref={inputRef} type={props.type ?? "text"} onChange={handleChange} />
    </BaseInput>
  )
}

