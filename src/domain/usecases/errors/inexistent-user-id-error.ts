export class InexistentUserIdError extends Error {
  constructor() {
    super("O e-mail forncecido é inválido!");
    this.name = "InexistentUserIdValue";
  }
}
