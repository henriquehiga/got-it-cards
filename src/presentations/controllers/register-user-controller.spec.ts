import { RegisterUserController } from "./register-user-controller";
import { MissingFieldError } from "../../domain/entities/errors/missing-field-error";
import { describe, expect, it, vitest } from "vitest";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { RegisterUser } from "../../domain/usecases/register-user";
import { UserModel } from "../../domain/entities/models/user-model";
import { InMemoryUserRepository } from "../../data/tests/memory-user-repository";

type sutTypes = {
  sut: RegisterUserController;
  usecase: RegisterUser;
};

const makeSut = (): sutTypes => {
  const repository = new InMemoryUserRepository();
  class MockRegisterUserUsecase extends RegisterUser {
    async execute(
      data: UserModel.Create
    ): Promise<Either<ErrorResponse, UserModel.Return>> {
      return right({
        name: data.name,
        email: data.email,
      });
    }
  }
  const usecaseStub = new MockRegisterUserUsecase(repository);
  const controller = new RegisterUserController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("RegisterUserController", () => {
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

  it("should return 201 if valid data is provided", async () => {
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
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });
});
