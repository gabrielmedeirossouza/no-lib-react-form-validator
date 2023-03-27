import React from 'react'
import { NumericInput, TextInput } from '../../components/form'
import { validatorPool as vPool } from './form-validator'
import { Container, Form } from './styles'

export function SignUp() {
  
  function handleSubmit(form: React.FormEvent) {
    form.preventDefault()
    vPool.NotifyValidates()

    if (!vPool.isValid) return

    console.log("Calling service API with data:")
    console.log({
      name: `${vPool.validators.firstName.value} ${vPool.validators.lastName.value}`,
      age: vPool.validators.age.value,
      password: vPool.validators.newPassword.value
    })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextInput label='Primeiro Nome' validator={vPool.validators.firstName} />
        <TextInput label='Último Nome' validator={vPool.validators.lastName} />
        <NumericInput label='Idade' min={0} max={125} validator={vPool.validators.age} />
        <TextInput label='Senha' type="password" validator={vPool.validators.newPassword} />
        <TextInput label='Confirme a senha' type="password" validator={vPool.validators.confirmNewPassword} />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  )
}
