export class WrongLoginDataError extends Error {
  constructor() {
    super("Dados incorretos fornecidos no login!");
    this.name = "WrongLoginDataError";
  }
}
