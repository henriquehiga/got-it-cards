import { LoginUserController } from "./login-user-controller";
import { LoginUser } from "../../domain/usecases/login-user";
import { MissingFieldError } from "../../domain/entities/errors/missing-field-error";
import { describe, expect, it, vitest } from "vitest";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { UserModel } from "../../domain/entities/models/user-model";
import { InMemoryUserRepository } from "../../data/tests/memory-user-repository";

type sutTypes = {
  sut: LoginUserController;
  usecase: LoginUser;
};

const makeSut = (): sutTypes => {
  const repository = new InMemoryUserRepository();
  class MockLoginUserUsecase extends LoginUser {
    async execute(
      data: UserModel.Login
    ): Promise<Either<ErrorResponse, UserModel.Return>> {
      return right({
        name: "valid name",
        email: data.email,
      });
    }
  }
  const usecaseStub = new MockLoginUserUsecase(repository);
  const controller = new LoginUserController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("LoginUserController", () => {
  it("should return 400 if EMAIL field is not provided", async () => {
    const { sut, usecase } = makeSut();
    const request: HttpRequest = {
      body: {
        name: "valid name",
        password: "valid awnser",
        email: "",
      },
      params: {
        id: "",
      },
    };
    const missingFieldError = new MissingFieldError("email");
    vitest.spyOn(usecase, "execute").mockResolvedValueOnce(
      left({
        error: missingFieldError,
        msg: missingFieldError.message,
      })
    );
    const response: HttpResponse = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(missingFieldError.message);
  });

  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const request: HttpRequest = {
      body: {
        name: "valid name",
        password: "valid awnser",
        email: "valid@mail.com",
      },
      params: {
        id: "",
      },
    };
    const response: HttpResponse = await sut.handle(request);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });
});
