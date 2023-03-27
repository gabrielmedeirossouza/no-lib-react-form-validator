import { ValidatorPool } from "../../validators/validator-pool";
import { StringValidator } from "../../validators/string-validator";
import { NumberValidator } from "../../validators/number-validator";

const firstName = new StringValidator("firstName").NotEmpty("O nome deve ser preenchido.")
const lastName = new StringValidator("lastName").NotEmpty("O último nome deve ser preenchido.")
const age = new NumberValidator("age").NotZero("A idade deve ser fornecida.").Min(15, "Você deve ser acima dos 15 anos (verificação de idade após cadastro).")
const newPassword = new StringValidator("newPassword").NotEmpty("A senha deve ser preenchida.").Min(6, "A senha deve ter pelo menos 6 caracteres.")
const confirmNewPassword = new StringValidator("confirmPassword").EqualTo(newPassword, "As senhas não coincidem.").NotEmpty("Você deve confirmar a senha.")

export const validatorPool = new ValidatorPool({
  firstName,
  lastName,
  age,
  newPassword,
  confirmNewPassword
})
