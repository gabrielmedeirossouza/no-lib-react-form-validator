import React from "react"
import { Container, Label, Error } from './styles'

interface Props {
  children: React.ReactNode
  label?: string
  messageErrors?: string[]
}

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