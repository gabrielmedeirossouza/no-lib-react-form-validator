import React from "react";
import { useClickedOutside } from "../../../hooks/ui";
import { BaseSelect, Input as SharedInput } from "../base-select";
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages";
import { Input } from './styles'
import type { ItemProtocol, PropsProtocol } from '../base-select'

export function SingleSelect<T extends string | number>(props: PropsProtocol<T>) {
  const inputRef = React.useRef<HTMLSpanElement>(null) // TODO: Change to Input. SEO and UX
  const inputContainerRef = useClickedOutside(onClickOutside);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  const clearOption = props.clearOption ? {
    label: props.clearOption[0],
    value: props.clearOption[1]
  } : undefined

  function handleItemClick(item: ItemProtocol<T>) {
    updateValue(item)
    setIsOpenDropdown(false)
  }

  function updateValue(item: ItemProtocol<T>) {
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
    const allItems = [...props.items, clearOption].filter((item): item is ItemProtocol<T> => Boolean(item))
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
        clearOption={clearOption}
        onItemClick={handleItemClick}
        messageErrors={messageErrors}
      >
        <SharedInput.Container ref={inputContainerRef}>
          <Input ref={inputRef} onClick={() => setIsOpenDropdown(oldValue => !oldValue)} />
        </SharedInput.Container>
      </BaseSelect>
  )
}
