import { ValidatorProtocol } from "../../../validators/validator-protocol"

export type ItemProtocol<T> = {
  label: string
  value: T
}

interface Props<T> {
  label?: string
  items: ItemProtocol<T>[]
  clearOption?: [label: string, value: T]
}

export interface PropsProtocol<T extends string | number> extends Props<T> {
  validator?: InstanceType<typeof ValidatorProtocol<T>>
  default?: T
}

export interface PropsArrayProtocol<T extends string | number> extends Props<T> {
  validator?: InstanceType<typeof ValidatorProtocol<T[]>>
  default?: T[]
}
