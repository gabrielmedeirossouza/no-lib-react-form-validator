import { ValidatorProtocol } from "./validator-protocol"

type ObjectValidator = {
  [key: string]: ValidatorProtocol<any>
}

export class ValidatorPool<T extends ObjectValidator> {
  constructor(
    public readonly validators: T
  ) {}

  public get validatorsList(): ReadonlyArray<ValidatorProtocol<any>> {
    return Object.values(this.validators)
  }

  public get isValid(): boolean {
    return this.validatorsList.every(validator => validator.isValid)
  }

  public NotifyValidates(): void {
    this.validatorsList.forEach(validator => {
      validator.Validate()
    })
  }
}