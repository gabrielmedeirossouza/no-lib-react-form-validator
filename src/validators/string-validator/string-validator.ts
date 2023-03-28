import { ValidatorProtocol } from "../validator-protocol"

export class StringValidator extends ValidatorProtocol<string> {
  constructor(fieldName: string) {
    super("", fieldName)
  }

  public NotEmpty(message?: string): StringValidator {
    this.AttachRule((value) => {
      const isEmpty = !Boolean(value.length)

      if (isEmpty)
        return this.Fail(message ?? "Field cannot be empty.")

      return this.Ok()
    })

    return this
  }

  public Min(min: number, message?: string): StringValidator {
    this.AttachRule((value) => {
      if (value.length < min)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal or greater than ${min}.`)

      return this.Ok()
    })

    return this
  }

  public Max(max: number, message?: string): StringValidator {
    this.AttachRule((value) => {
      if (value.length > max)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal or less than ${max}.`)

      return this.Ok()
    })

    return this
  }

  public EqualTo(compare: StringValidator, message?: string): StringValidator {
    this.AttachRule((value: string) => {
      if (compare.value !== value)
        return this.Fail(message ?? `Field ${this.fieldName} must be equal to ${compare.fieldName}.`)

      return this.Ok()
    })

    compare.OnValidate(() => this.Validate())

    return this
  }

  public Email(message?: string): StringValidator {
    this.AttachRule((value) => {
      const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = EMAIL_REGEX.test(value);

      if (!isValidEmail)
        return this.Fail(message ?? `Field ${this.fieldName} must be a valid email.`)

      return this.Ok()
    })

    return this
  }
}