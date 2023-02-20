export class InexistentUserIdError extends Error {
  constructor() {
    super("O valor do ID do usuário é inexistente ou inválido!");
    this.name = "InexistentUserIdValue";
  }
}
