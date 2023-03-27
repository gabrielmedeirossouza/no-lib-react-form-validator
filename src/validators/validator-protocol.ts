type ValidatorOk<T> = {
  ok: true
  value: T
}

type ValidatorFail = {
  ok: false
  message: string
}

type ValidatorRule<T> = ValidatorOk<T> | ValidatorFail
type ValidatorRuleCallback<T> = (value: T) => ValidatorRule<T>

export abstract class ValidatorProtocol<T> {
  public abstract value: T
  public abstract fieldName: string
  private _isValid = true
  private _rules: ValidatorRule<T>[] = []
  private _invalidRulesMessages: string[] = []
  private readonly _callbackRules: Set<ValidatorRuleCallback<T>> = new Set()
  private readonly _onValidateCallbacks: Array<() => void> = []

  public get isValid(): boolean {
    return this._isValid
  }

  public get rules(): ReadonlyArray<ValidatorRule<T>> {
    return this._rules
  }

  public get invalidRulesMessages(): string[] {
    return this._invalidRulesMessages
  }

  protected AttachRule(rule: ValidatorRuleCallback<T>): void {
    this._callbackRules.add(rule)
  }

  protected Ok(value: T): ValidatorOk<T> {
    return {
      ok: true,
      value
    }
  }

  protected Fail(message: string): ValidatorFail {
    return {
      ok: false,
      message
    }
  }

  public OnValidate(callback: () => void): () => void {
    this._onValidateCallbacks.push(callback)

    return callback
  }

  public RemoveOnValidateEvent(callback: () => void): void {
    const index = this._onValidateCallbacks.findIndex(attachedCallback => attachedCallback === callback)

    if (index === -1) {
      console.error("Validator RemoveOnValidateEvent: Could not find callback function event.")
      return
    }

    this._onValidateCallbacks.splice(index, 1)
  }

  public Validate() {
    this._ClearValidatorStatus()

    for (const ruleFn of this._callbackRules) {
      const rule = ruleFn(this.value)

      this._rules.push(rule)

      if (!rule.ok) {
        this._invalidRulesMessages.push(rule.message)
        this._isValid = false
      }
    }

    this._NotifyOnValidate()
  }

  private _ClearValidatorStatus(): void {
    this._isValid = true
    this._invalidRulesMessages = []
    this._rules = []
  }

  private _NotifyOnValidate(): void {
    this._onValidateCallbacks.forEach(OnValidate => OnValidate())
  }
}
