import { Container, Label, Error } from '../base/styles'
import type { DefaultFormComponentProtocol } from "../base/protocols"

interface Props extends DefaultFormComponentProtocol {}

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