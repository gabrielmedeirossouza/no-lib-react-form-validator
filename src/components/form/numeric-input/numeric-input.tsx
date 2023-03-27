import React from 'react'
import { NumberValidator } from '../../../validators/number-validator'
import { BaseInput } from '../base-input'
import { Input } from './styles'

const NULLABLE_VALUES = ["", "-", "0", "-0"]
const MAYBE_NUMERICS = ["-", "+"]

type StringToNumeric = {
  ok: true
  value: number
} | {
  ok: false
}

interface Props {
  label?: string
  min?: number
  max?: number
  default?: number
  validator?: NumberValidator
  onChange?(value: number): void
}

export function NumericInput(props: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [messageErrors, setMessageErrors] = React.useState<string[]>([])
  const [isValidatorDispatchedValidate, setIsValidatorDispatchedValidate] = React.useState(false)

  const defaultValue = props.default ?? 0
  const minValue = props.min ?? Number.MIN_SAFE_INTEGER
  const maxValue = props.max ?? Number.MAX_SAFE_INTEGER

  if (defaultValue > maxValue)
    console.error(`NumericInput: defaultValue must be equal or less than maxValue: ${maxValue}`)

  if (defaultValue < minValue)
    console.error(`NumericInput: defaultValue must be equal or greater than minValue: ${minValue}`)

  if (maxValue < minValue)
    console.error(`NumericInput: max value could not be less than min value. min: ${props.min}, max: ${props.max}`)

  function handleChange(rawValue: string) {
    const expectNumeric = parseStringToNumeric(rawValue)

    if (!expectNumeric.ok) return

    const numeric = expectNumeric.value

    const clampedValue = Math.min(Math.max(numeric, minValue), maxValue)
    updateValue(clampedValue)
  }

  function parseStringToNumeric(rawValue: string, isRecursiveCall = false): StringToNumeric {
    const value = Number(rawValue)
    const isEmpty = rawValue.length === 0
    const isNullable = NULLABLE_VALUES.includes(rawValue)
    const isNumber = isEmpty ? false : !isNaN(value)

    if (isNumber)
      return {
        ok: true,
        value
      }

    if ((isEmpty || isNullable) && isRecursiveCall)
      return {
        ok: true,
        value: defaultValue
      }

    if (isEmpty)
      return {
        ok: false
      }

    const missingDataToDefineType = MAYBE_NUMERICS.includes(rawValue)
    if (missingDataToDefineType)
      return {
        ok: false
      }

    const removedLastCharacterFromRawValue = rawValue.slice(0, rawValue.length - 1)
    return parseStringToNumeric(removedLastCharacterFromRawValue, true)
  }

  function handleBlur(rawValue: string) {
    if (NULLABLE_VALUES.includes(rawValue))
      updateValue(defaultValue)
  }

  function updateValue(value: number) {
    if (inputRef.current)
      inputRef.current.value = String(value)

    if (props.validator)
      props.validator.value = value

    if (props.validator && isValidatorDispatchedValidate)
      props.validator.Validate()
  }

  React.useEffect(() => {
    if (!props.validator) return

    props.validator.OnValidate(() => {
      if (!props.validator) return

      setIsValidatorDispatchedValidate(true)
      const errorMessages = props.validator.invalidRulesMessages

      setMessageErrors(errorMessages.length ? errorMessages : [])
    })
  }, [])

  React.useEffect(() => {
    updateValue(defaultValue)
  }, [inputRef])

  return (
    <BaseInput label={props.label} messageErrors={messageErrors}>
      <Input
        ref={inputRef}
        type="text"
        onChange={(event) => handleChange(event.target.value)}
        onBlur={(event) => handleBlur(event.target.value)}
      />
    </BaseInput>
  )
}