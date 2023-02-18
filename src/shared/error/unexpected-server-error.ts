export class UnexpectedServerError extends Error {
  constructor(local: string) {
    super(
      "Erro inesperado do servidor em [" +
        local +
        "]. Contate o time de desenvolvimento."
    );
    this.name = "UnexpectedServerError";
  }
}
