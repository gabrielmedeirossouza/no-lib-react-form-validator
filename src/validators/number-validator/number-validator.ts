import { ValidatorProtocol } from "../validator-protocol"

export class NumberValidator extends ValidatorProtocol<number> {
  public value = 0
  public fieldName: string

  constructor(fieldName: string) {
    super()
    this.fieldName = fieldName
  }

  public NotZero(message?: string): NumberValidator {
    this.AttachRule((value) => {
      if (value === 0)
        return this.Fail(message ?? "The value cannot be zero.")

      return this.Ok()
    })

    return this
  }

  public Min(min: number, message?: string): NumberValidator {
    this.AttachRule((value) => {
      if (value < min)
        return this.Fail(message ?? `The min value must be equal or greater than ${value}.`)

      return this.Ok()
    })

    return this
  }

  public Max(max: number, message?: string): NumberValidator {
    this.AttachRule((value) => {
      if (value > max)
        return this.Fail(message ?? `The max value must be equal or less than ${value}.`)

      return this.Ok()
    })

    return this
  }
}