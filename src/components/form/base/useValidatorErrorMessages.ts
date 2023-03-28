import React from "react"
import { ValidatorProtocol } from "../../../validators/validator-protocol"

export function useValidatorErrorMessages(validator?: ValidatorProtocol<any>) {
  const [validated, setValidated] = React.useState(false)
  const [messageErrors, setMessageErrors] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!validator) return

    const callback = validator.OnValidate(() => {
      if (!validator) return

      setValidated(true)
      const messages = validator.invalidRulesMessages

      setMessageErrors(messages.length ? messages : [])
    })

    return () => validator?.RemoveOnValidateEvent(callback)
  }, [])

  return {
    validated,
    messageErrors
  }
}