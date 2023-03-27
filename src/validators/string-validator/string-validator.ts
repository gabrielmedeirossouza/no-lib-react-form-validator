import { ValidatorProtocol } from "../validator-protocol"

export class StringValidator extends ValidatorProtocol<string> {
  public value = ""
  public fieldName: string

  constructor(fieldName: string) {
    super()
    this.fieldName = fieldName
  }

  public NotEmpty(message?: string): StringValidator {
    this.AttachRule((value) => {
      const isEmpty = !Boolean(value.length)

      if (isEmpty)
        return this.Fail(message ?? "Field could not be empty.")

      return this.Ok(value)
    })

    return this
  }

  public Min(min: number, message?: string): StringValidator {
    this.AttachRule((value) => {
      if (value.length < min)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal or greater than ${min}.`)

      return this.Ok(value)
    })

    return this
  }

  public Max(max: number, message?: string): StringValidator {
    this.AttachRule((value) => {
      if (value.length > max)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal or less than ${max}.`)

      return this.Ok(value)
    })

    return this
  }

  public EqualTo(compare: StringValidator, message?: string): StringValidator {
    this.AttachRule((value: string) => {
      if (compare.value !== value)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal to ${compare.fieldName}.`)

      return this.Ok(value)
    })

    compare.OnValidate(() => this.Validate())

    return this
  }
}