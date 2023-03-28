import { DefaultFormComponentProtocol } from '../base/protocols'
import { Container, Label, Error } from '../base/styles'
import { Input } from './styles'

type DropdownItem<T extends string | number> = {
  label: string
  value: T
}

export type DropdownItemsTypes = DropdownItem<string>[] | DropdownItem<number>[]
export type DropdownItemType = DropdownItemsTypes extends (infer Item)[] ? Item : never

interface Props extends DefaultFormComponentProtocol {
  isOpenDropdown: boolean
  dropdownItems: DropdownItemsTypes
  onItemClick(item: DropdownItemType): void
  clearOption?: DropdownItemType
}

export function BaseSelect(props: Props) {
  function handleItemClick(event: React.MouseEvent, item: DropdownItemType) {
    event.stopPropagation()
    props.onItemClick(item)
  }

  return (
    <Container>
      <Label>{props.label}
        <Input.Container>
          {props.children}

          <Input.DropdownList isOpen={props.isOpenDropdown}>
            {props.clearOption && (
              <Input.DropdownItem separator onClick={(e) => handleItemClick(e, props.clearOption!)}>
                {props.clearOption.label}
              </Input.DropdownItem>
            )}

            {props.dropdownItems.map((item, index) => (
              <Input.DropdownItem key={index} onClick={(e) => handleItemClick(e, item)}>{item.label}</Input.DropdownItem>
            ))}
          </Input.DropdownList>
        </Input.Container>

        <Error.List>
          {props.messageErrors?.map((messageError, index) => (
            <Error.Message key={index}>{messageError}</Error.Message>
          ))}
        </Error.List>
      </Label>
    </Container>
  )
}
