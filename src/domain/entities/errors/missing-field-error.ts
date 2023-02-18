export class MissingFieldError extends Error {
  constructor(field: string) {
    super("O campo [" + field.toUpperCase() + "] é obrigatório!");
    this.name = "MissingFieldError";
  }
}
