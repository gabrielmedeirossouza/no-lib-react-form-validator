import React from "react"
import { useClickedOutside } from "../../../hooks/ui"
import { ArrayValidator } from "../../../validators"
import { BaseSelect, DropdownItemsTypes } from "../base-select"
import { Input as SharedInput } from '../base-select/styles'
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages"
import { Input } from './styles'

type ValidatorType<T extends string | number> = T extends string
  ? ArrayValidator<string>
  : ArrayValidator<number>

type ExtractItem<T> = T extends (infer I)[] ? I : never

interface Props<Items extends DropdownItemsTypes, Item extends ExtractItem<Items>> {
  label?: string
  items: Items
  validator?: ValidatorType<Item["value"]>
  clearOption?: Item
  default?: Item["value"][]
}

export function MultiSelect<Items extends DropdownItemsTypes, Item extends ExtractItem<Items>>(props: Props<Items, Item>) {
  const inputContainerRef = useClickedOutside(onClickOutside)
  const inputRef = React.useRef<HTMLSpanElement>(null)
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  function handleItemClick(item: Item) {
    const itemIncludedInSelectedItems = Boolean(selectedItems.find(selectedItem => selectedItem.value === item.value))

    if (itemIncludedInSelectedItems) {
      handleRemoveItem(item)
      return
    }

    handleAddItem(item)
  }

  function handleAddItem(item: Item) {
    if (item.value === props.clearOption?.value) {
      updateValue([item])
      return
    }

    const selectedItemsWithoutClearOption = selectedItems.filter(selectedItem => selectedItem.value !== props.clearOption?.value)
    const newItems = [...selectedItemsWithoutClearOption, item]
    updateValue(newItems)
  }

  function handleRemoveItem(item: Item) {
    const newItems = selectedItems.filter(selectedItem => selectedItem.value !== item.value)
    updateValue(newItems)
  }

  function updateValue(items: Item[]) {
    setSelectedItems(items)

    if (inputRef.current)
      inputRef.current.textContent = items.map(item => item.label).join(", ")

    if (props.validator)
      props.validator.value = items.map(item => item.value) as string[] | number[]

    if (props.validator && validated)
      props.validator.Validate()
  }

  function onClickOutside() {
    setIsOpenDropdown(false)
  }

  function attemptGetItemsByValues(values: Item["value"][]) {
    const allItems = [...props.items, props.clearOption].filter((item): item is Item => Boolean(item))
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
      if (item.value === props.clearOption?.value && expectedItems.length > 1)
        console.warn(`MultiSelect Default load: Default values and clearOption overrides. Please, do not use default values and clearOption together. Default prop: (${props.default?.join(", ")})`)

      handleAddItem(item)
    })
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
