import { describe, expect, it } from "vitest";
import { UserRepository } from "../../data/protocols/user-repository";
import { UserModel } from "../entities/models/user-model";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { ErrorResponse } from "./../../shared/error-response";
import { MissingFieldError } from "./../entities/errors/missing-field-error";
import { RegisterUser } from "./register-user";

type sutTypes = {
  sut: RegisterUser;
  repository: UserRepository;
};

const makeSut = (): sutTypes => {
  const repository: UserRepository = new InMemoryUserRepository();
  const sut = new RegisterUser(repository);
  return {
    sut,
    repository,
  };
};

describe("RegisterUser Usecase", () => {
  it("should not be able to create a new user card if entity validation fails", async () => {
    const { sut } = makeSut();
    const invalidCreateUserModel: UserModel.Create = {
      name: "",
      email: "valid@mail.com",
      password: "valid_hashed_password",
    };
    const error = (await sut.execute(invalidCreateUserModel))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(MissingFieldError);
    expect(error.msg).toEqual(new MissingFieldError("name").message);
  });
});
