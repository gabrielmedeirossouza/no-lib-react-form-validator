import { ValidatorPool } from "../../validators/validator-pool";
import { StringValidator } from "../../validators/string-validator";
import { NumberValidator } from "../../validators/number-validator";
import { ArrayValidator } from "../../validators";

const firstName = new StringValidator("firstName").NotEmpty("O nome deve ser preenchido.")
const lastName = new StringValidator("lastName").NotEmpty("O último nome deve ser preenchido.")
const age = new NumberValidator("age").NotZero("A idade deve ser fornecida.").Min(15, "Você deve ser acima dos 15 anos (verificação de idade após cadastro).")
const email = new StringValidator("email").NotEmpty("Você deve fornecer seu email.").Email("O e-mail deve ser válido.")
const newPassword = new StringValidator("newPassword").NotEmpty("A senha deve ser preenchida.").Min(6, "A senha deve ter pelo menos 6 caracteres.")
const confirmNewPassword = new StringValidator("confirmPassword").EqualTo(newPassword, "As senhas não coincidem.").NotEmpty("Você deve confirmar a senha.")
const preferencePodcastPlace = new NumberValidator("preferencePodcastPlace").NotZero("Você deve escolher um local.")
const preferencePodcastGenre = new ArrayValidator<number>("preferencePodcastGenre").MustNotContain([0], "Você deve informar 1 ou mais gêneros.")

export const validatorPool = new ValidatorPool({
  firstName,
  lastName,
  age,
  email,
  newPassword,
  confirmNewPassword,
  preferencePodcastPlace,
  preferencePodcastGenre
})

export const { validators } = validatorPool
