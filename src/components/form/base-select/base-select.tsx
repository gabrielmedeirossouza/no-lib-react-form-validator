import { Container, Label, Error } from '../base/styles'
import { Input } from './styles'
import type { DefaultBaseFormComponentProtocol } from '../base/protocols'
import type { ItemProtocol } from './protocols'

type ClearOption<T> = {
  label: string
  value: T
}

interface Props<T extends string | number> extends DefaultBaseFormComponentProtocol {
  isOpenDropdown: boolean
  dropdownItems: ItemProtocol<T>[]
  onItemClick(item: ItemProtocol<T>): void
  clearOption?: ClearOption<T>
}

export function BaseSelect<T extends string | number>(props: Props<T>) {
  function handleItemClick(event: React.MouseEvent, item: ItemProtocol<T>) {
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
