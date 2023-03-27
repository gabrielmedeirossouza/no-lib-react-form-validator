import React from 'react'
import { StringValidator } from '../../../validators/string-validator'
import { BaseInput } from '../base-input'
import { Input } from './styles'

interface Props {
  label?: string
  type?: "text" | "password"
  validator?: StringValidator
  onChange?(value: string): void
}

export function TextInput(props: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [messageErrors, setMessageErrors] = React.useState<string[]>([])
  const [isValidatorDispatchedValidate, setIsValidatorDispatchedValidate] = React.useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim()

    if (value !== event.target.value && inputRef.current)
      inputRef.current.value = value

    if (props.onChange)
      props.onChange(value)

    if (isValidatorDispatchedValidate && props.validator) {
      props.validator.value = value
      props.validator.Validate()
    }
  }

  React.useEffect(() => {
    if (!props.validator) return

    const callback = props.validator.OnValidate(() => {
      if (!props.validator) return

      setIsValidatorDispatchedValidate(true)
      const errorMessages = props.validator.invalidRulesMessages

      setMessageErrors(errorMessages.length ? errorMessages : [])
    })

    return () => props.validator?.RemoveOnValidateEvent(callback)
  }, [])

  return (
    <BaseInput label={props.label} messageErrors={messageErrors}>
      <Input ref={inputRef} type={props.type ?? "text"} onChange={handleChange} />
    </BaseInput>
  )
}