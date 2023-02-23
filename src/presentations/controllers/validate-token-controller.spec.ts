import { describe, expect, it } from "vitest";
import { HttpRequest } from "./../protocols/http";
import { ValidateTokenController } from "./validate-token-controller";

type SutTypes = {
  sut: ValidateTokenController;
};

const makeSut = (): SutTypes => {
  const controller = new ValidateTokenController();
  return {
    sut: controller,
  };
};

describe("ValidateToken Controller", async () => {
  it("should not be to validate if token is not provided", async () => {
    const { sut } = makeSut();
    const request: HttpRequest = {
      body: "",
      params: {},
    };
    const error = await sut.handle(request);
    expect(error.body).toBe("Obrigatório fornecer um TOKEN");
    expect(error.statusCode).toBe(400);
  });
});
