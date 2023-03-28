import React from 'react'
import { NumericInput, TextInput, SingleSelect, MultiSelect } from '../../components/form'
import { LISTENING_PODCAST_ITEMS, PODCAST_GENRE_ITEMS } from './@constants'
import { validatorPool, validators } from './form-validator'
import { Container, Form } from './styles'

export function SignUp() {

  function handleSubmit(form: React.FormEvent) {
    form.preventDefault()
    validatorPool.NotifyValidates()

    if (!validatorPool.isValid) return

    console.log("Calling service API with data:")
    console.log(JSON.stringify(validators, null, 2))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextInput label='Primeiro Nome' validator={validators.firstName} />
        <TextInput label='Último Nome' validator={validators.lastName} />
        <NumericInput label='Idade' min={0} max={125} validator={validators.age} />
        <TextInput label='E-mail' validator={validators.email} />

        <SingleSelect
          label='Em qual ambiente você escuta podcast?'
          items={LISTENING_PODCAST_ITEMS}
          default={0}
          clearOption={["Selecionar", 0]}
          validator={validators.preferencePodcastPlace}
        />

        <MultiSelect
          label='Quais os gêneros de podcast que você mais gosta?'
          items={PODCAST_GENRE_ITEMS}
          validator={validators.preferencePodcastGenre}
          default={[0]}
          clearOption={["Selecionar", 0]}
        />
        
        <TextInput label='Senha' type="password" validator={validators.newPassword} />
        <TextInput label='Confirme a senha' type="password" validator={validators.confirmNewPassword} />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  )
}
