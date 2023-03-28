import React from "react";
import { useClickedOutside } from "../../../hooks/ui";
import { NumberValidator, StringValidator } from "../../../validators";
import { BaseSelect, DropdownItemsTypes } from "../base-select";
import { Input as SharedInput } from '../base-select/styles'
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages";
import { Input } from './styles'

type ValidatorType<T extends string | number> = T extends string
  ? StringValidator
  : NumberValidator

type ExtractItem<T> = T extends (infer I)[] ? I : never

interface Props<Items extends DropdownItemsTypes, Item extends ExtractItem<Items>> {
  label?: string
  items: Items
  validator?: ValidatorType<Item["value"]>
  clearOption?: Item
  default?: Item["value"]
}

export function SingleSelect<Items extends DropdownItemsTypes, Item extends ExtractItem<Items>>(props: Props<Items, Item>) {
  const inputRef = React.useRef<HTMLSpanElement>(null)
  const inputContainerRef = useClickedOutside(onClickOutside);
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  function handleItemClick(item: Item) {
    updateValue(item)
    setIsOpenDropdown(false)
  }

  function updateValue(item: Item) {
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

  function attemptGetItemByValue(value: Item["value"]) {
    const allItems = [...props.items, props.clearOption].filter((item): item is Item => Boolean(item))
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
