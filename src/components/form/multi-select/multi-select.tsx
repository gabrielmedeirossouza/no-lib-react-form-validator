import React from "react"
import { useClickedOutside } from "../../../hooks/ui"
import { ArrayValidator } from "../../../validators"
import { BaseSelect, Item } from "../base-select"
import { Input as SharedInput } from '../base-select/styles'
import { useValidatorErrorMessages } from "../base/useValidatorErrorMessages"
import { Input } from './styles'

type Validator<T extends string | number> = T extends string
  ? ArrayValidator<string>
  : ArrayValidator<number>

interface Props<T extends string | number> {
  label?: string
  items: Item<T>[]
  validator?: Validator<T>
  clearOption?: [label: string, value: T]
  default?: T[]
}

export function MultiSelect<T extends string | number>(props: Props<T>) {
  const inputContainerRef = useClickedOutside(onClickOutside)
  const inputRef = React.useRef<HTMLSpanElement>(null)
  const [selectedItems, setSelectedItems] = React.useState<Item<T>[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
  const { validated, messageErrors } = useValidatorErrorMessages(props.validator)

  function handleItemClick(item: Item<T>) {
    const itemIncludedInSelectedItems = Boolean(selectedItems.find(selectedItem => selectedItem.value === item.value))

    if (itemIncludedInSelectedItems) {
      handleRemoveItem(item)
      return
    }

    handleAddItem(item)
  }

  function handleAddItem(item: Item<T>) {
    if (item.value === props.clearOption?.[1]) {
      updateValue([item])
      return
    }

    const selectedItemsWithoutClearOption = selectedItems.filter(selectedItem => selectedItem.value !== props.clearOption?.[1])
    const newItems = [...selectedItemsWithoutClearOption, item]
    updateValue(newItems)
  }

  function handleRemoveItem(item: Item<T>) {
    const newItems = selectedItems.filter(selectedItem => selectedItem.value !== item.value)
    updateValue(newItems)
  }

  function updateValue(items: Item<T>[]) {
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

  function attemptGetItemsByValues(values: T[]) {
    const allItems = [...props.items, { label: props.clearOption?.[0], value: props.clearOption?.[1] }].filter((item): item is Item<T> => Boolean(item))
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
