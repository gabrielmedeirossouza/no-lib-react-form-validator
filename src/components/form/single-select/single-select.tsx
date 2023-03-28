import React from "react";
import { useClickedOutside } from "../../../hooks/ui";
import { NumberValidator, StringValidator } from "../../../validators";
import { BaseSelect, Item } from "../base-select";
import { Input as SharedInput } from '../base-select/styles'
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages";
import { Input } from './styles'

type Validator<T extends string | number> = T extends string
  ? StringValidator
  : NumberValidator

interface Props<T extends string | number> {
  label?: string
  items: Item<T>[]
  validator?: Validator<T>
  clearOption?: [label: string, value: T]
  default?: T
}

export function SingleSelect<T extends string | number>(props: Props<T>) {
  const inputRef = React.useRef<HTMLSpanElement>(null)
  const inputContainerRef = useClickedOutside(onClickOutside);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  function handleItemClick(item: Item<T>) {
    updateValue(item)
    setIsOpenDropdown(false)
  }

  function updateValue(item: Item<T>) {
    if (inputRef.current)
      inputRef.current.textContent = item.label

    if (props.validator)
      props.validator.value = item.value

    if (props.validator && validated)
      props.validator.Validate()
  }

  function onClickOutside() {
    setIsOpenDropdown(false)
  }

  function attemptGetItemByValue(value: T) {
    const allItems = [...props.items, { label: props.clearOption?.[0], value: props.clearOption?.[1] }].filter((item): item is Item<T> => Boolean(item))
    const expectedItem = allItems.find(item => item.value === value)

    if (!expectedItem)
      console.error(`SingleSelect attemptGetItemByValue: Cannot find item by value. Provided value: ${value}.`)

    return expectedItem
  }

  React.useEffect(() => {
    if (props.default === undefined) return

    const expectedItem = attemptGetItemByValue(props.default)
    if (!expectedItem) return

    updateValue(expectedItem)
  }, [inputRef])

  return (
      <BaseSelect
        label={props.label}
        isOpenDropdown={isOpenDropdown}
        dropdownItems={props.items}
        clearOption={props.clearOption}
        onItemClick={handleItemClick}
        messageErrors={messageErrors}
      >
        <SharedInput.Container ref={inputContainerRef}>
          <Input ref={inputRef} onClick={() => setIsOpenDropdown(oldValue => !oldValue)} />
        </SharedInput.Container>
      </BaseSelect>
  )
}
