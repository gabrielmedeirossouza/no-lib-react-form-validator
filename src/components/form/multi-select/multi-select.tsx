import React from "react"
import { useClickedOutside } from "../../../hooks/ui"
import { BaseSelect, Input as SharedInput } from "../base-select"
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages"
import { Input } from './styles'
import type { ItemProtocol, PropsArrayProtocol } from '../base-select'

export function MultiSelect<T extends string | number>(props: PropsArrayProtocol<T>) {
  const inputRef = React.useRef<HTMLSpanElement>(null)
  const [selectedItems, setSelectedItems] = React.useState<ItemProtocol<T>[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const inputContainerRef = useClickedOutside(onClickOutside)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  const clearOption = props.clearOption ? {
    label: props.clearOption[0],
    value: props.clearOption[1]
  } : undefined

  function handleItemClick(item: ItemProtocol<T>) {
    const itemIncludedInSelectedItems = Boolean(selectedItems.find(selectedItem => selectedItem.value === item.value))

    if (itemIncludedInSelectedItems) {
      handleRemoveItem(item)
      return
    }

    handleAddItem(item)
  }

  function handleAddItem(item: ItemProtocol<T>) {
    if (item.value === props.clearOption?.[1]) {
      updateValue([item])
      return
    }

    const selectedItemsWithoutClearOption = selectedItems.filter(selectedItem => selectedItem.value !== props.clearOption?.[1])
    const newItems = [...selectedItemsWithoutClearOption, item]
    updateValue(newItems)
  }

  function handleRemoveItem(item: ItemProtocol<T>) {
    const newItems = selectedItems.filter(selectedItem => selectedItem.value !== item.value)
    updateValue(newItems)
  }

  function updateValue(items: ItemProtocol<T>[]) {
    setSelectedItems(items)

    if (inputRef.current)
      inputRef.current.textContent = items.map(item => item.label).join(", ")

    if (props.validator)
      props.validator.value = items.map(item => item.value)

    if (props.validator && validated)
      props.validator.Validate()
  }

  function onClickOutside() {
    setIsOpenDropdown(false)
  }

  function attemptGetItemsByValues(values: T[]) {
    const allItems = [...props.items, clearOption].filter((item): item is ItemProtocol<T> => Boolean(item))
    const expectedItems = allItems.filter(item => values.includes(item.value))

    if (expectedItems.length !== values.length)
      console.error(`MultiSelect attemptGetItemsByValues: Cannot find items by values. Provided values: ${JSON.stringify(values)}.`)

    return expectedItems
  }

  React.useEffect(() => {
    if (props.default === undefined) return

    const expectedItems = attemptGetItemsByValues(props.default)
    if (!expectedItems) return

    expectedItems.forEach(item => {
      if (item.value === props.clearOption?.[1] && expectedItems.length > 1)
        console.warn(`MultiSelect Default load: Default values and clearOption overrides. Please, do not use default values and clearOption together. Default prop: (${props.default?.join(", ")})`)

      handleAddItem(item)
    })
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
