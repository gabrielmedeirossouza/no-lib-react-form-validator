import React from 'react'
import { NumericInput, TextInput, SingleSelect, MultiSelect } from '../../components/form'
import { LISTENING_PODCAST_ITEMS, PODCAST_GENRE_ITEMS } from './@constants'
import { validatorPool as vPool } from './form-validator'
import { Container, Form } from './styles'

export function SignUp() {

  function handleSubmit(form: React.FormEvent) {
    form.preventDefault()
    vPool.NotifyValidates()

    if (!vPool.isValid) return

    console.log("Calling service API with data:")
    console.log(JSON.stringify(vPool.validators, null, 2))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextInput label='Primeiro Nome' validator={vPool.validators.firstName} />
        <TextInput label='Último Nome' validator={vPool.validators.lastName} />
        <NumericInput label='Idade' min={0} max={125} validator={vPool.validators.age} />
        <TextInput label='E-mail' validator={vPool.validators.email} />
        <SingleSelect
          label='Em qual ambiente você escuta podcast?'
          items={LISTENING_PODCAST_ITEMS}
          default={0}
          clearOption={{ label: "Selecionar", value: 0 }}
          validator={vPool.validators.preferencePodcastPlace}
        />
        <MultiSelect
          label='Quais os gêneros de podcast que você mais gosta?'
          items={PODCAST_GENRE_ITEMS}
          validator={vPool.validators.preferencePodcastGenre}
          default={[0]}
          clearOption={{ label: "Selecionar", value: 0 }}
        />
        <TextInput label='Senha' type="password" validator={vPool.validators.newPassword} />
        <TextInput label='Confirme a senha' type="password" validator={vPool.validators.confirmNewPassword} />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  )
}
