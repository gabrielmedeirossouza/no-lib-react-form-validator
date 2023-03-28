import { DefaultFormComponentProtocol } from '../base/protocols'
import { Container, Label, Error } from '../base/styles'
import { Input } from './styles'

export type Item<T extends string | number> = {
  label: string
  value: T
}

interface Props<T extends string | number> extends DefaultFormComponentProtocol {
  isOpenDropdown: boolean
  dropdownItems: Item<T>[]
  onItemClick(item: Item<T>): void
  clearOption?: [label: string, value: T]
}

export function BaseSelect<T extends string | number>(props: Props<T>) {
  function handleItemClick(event: React.MouseEvent, item: Item<T>) {
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
              <Input.DropdownItem separator onClick={(e) => handleItemClick(e, { label: props.clearOption![0]!, value: props.clearOption![1]!})}>
                {props.clearOption[0]}
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
