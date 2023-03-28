import React from 'react'
import { NumericInput, TextInput, SingleSelect, MultiSelect } from '../../components/form'
import { LISTENING_PODCAST_ITEMS, PODCAST_GENRE_ITEMS } from './@constants'
import { validatorPool as vPool } from './form-validator'
import { Container, Form } from './styles'

const {
  firstName,
  lastName,
  age,
  email,
  preferencePodcastPlace,
  preferencePodcastGenre,
  newPassword,
  confirmNewPassword
} = vPool.validators

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
        <TextInput label='Primeiro Nome' validator={firstName} />
        <TextInput label='Último Nome' validator={lastName} />
        <NumericInput label='Idade' min={0} max={125} validator={age} />
        <TextInput label='E-mail' validator={email} />

        <SingleSelect
          label='Em qual ambiente você escuta podcast?'
          items={LISTENING_PODCAST_ITEMS}
          default={0}
          clearOption={["Selecionar", 0]}
          validator={preferencePodcastPlace}
        />

        <MultiSelect
          label='Quais os gêneros de podcast que você mais gosta?'
          items={PODCAST_GENRE_ITEMS}
          validator={preferencePodcastGenre}
          default={[0]}
          clearOption={["Selecionar", 0]}
        />
        
        <TextInput label='Senha' type="password" validator={newPassword} />
        <TextInput label='Confirme a senha' type="password" validator={confirmNewPassword} />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  )
}
