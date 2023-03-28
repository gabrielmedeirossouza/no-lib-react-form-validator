import { ValidatorProtocol } from "../validator-protocol";

export class ArrayValidator<T extends string | number> extends ValidatorProtocol<T[]> {
  public value: T[] = [];
  public fieldName: string;

  constructor(fieldName: string) {
    super()
    this.fieldName = fieldName
  }

  public NotEmpty(message?: string): ArrayValidator<T> {
    this.AttachRule((value) => {
      if (value.length === 0)
        return this.Fail(message ?? `Field ${this.fieldName} cannot be empty.`)

      return this.Ok(value)
    })

    return this
  }

  public MustNotContain(mustNotContainList: T[], message?: string) {
    this.AttachRule((values) => {
      const containItemListInsideValues = mustNotContainList.some(listItem => values.includes(listItem))

      if (containItemListInsideValues)
        return this.Fail(message ?? `Field ${this.fieldName} cannot contain (${values.join(", ")}).`)

      return this.Ok(values)
    })

    return this
  }

  public MustContain(mustContainList: T[], message?: string) {
    this.AttachRule((values) => {
      const containItemListInsideValues = mustContainList.some(listItem => values.includes(listItem))

      if (!containItemListInsideValues)
        return this.Fail(message ?? `Field ${this.fieldName} must contain (${values.join(", ")}).`)

      return this.Ok(values)
    })

    return this
  }
}