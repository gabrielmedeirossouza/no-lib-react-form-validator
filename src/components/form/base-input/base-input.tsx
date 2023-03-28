import { Container, Label, Error } from '../base/styles'
import type { DefaultBaseFormComponentProtocol } from "../base/protocols"

interface Props extends DefaultBaseFormComponentProtocol {}

export function BaseInput(props: Props) {
  return (
    <Container>
      <Label>{props.label}
        {props.children}

        <Error.List>
          {props.messageErrors?.map((messageError, index) => (
            <Error.Message key={index}>{messageError}</Error.Message>
          ))}
        </Error.List>
      </Label>
    </Container>
  )
}