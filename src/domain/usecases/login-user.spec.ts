import { LoginUser } from "./login-user";
import { WrongLoginDataError } from "./errors/wrong-login-data-error";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { ErrorResponse } from "./../../shared/error-response";
import { UserModel } from "../entities/models/user-model";
import { describe, expect, it, vitest } from "vitest";
import { UserRepository } from "../../data/protocols/user-repository";

type sutTypes = {
  sut: LoginUser;
  repository: UserRepository;
};

const makeSut = (): sutTypes => {
  const repository: UserRepository = new InMemoryUserRepository();
  const sut = new LoginUser(repository);
  return {
    sut,
    repository,
  };
};

describe("LoginUser Usecase", () => {
  it("should fails login if wrong password is provided", async () => {
    const { sut } = makeSut();
    const wrongLoginUserModel: UserModel.Login = {
      email: "valid@mail.com",
      password: "wrong_password",
    };
    const error = (await sut.execute(wrongLoginUserModel))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(WrongLoginDataError);
    expect(error.msg).toBe(new WrongLoginDataError().message);
  });

  //   it("should login if correct data is provided", async () => {
  //     const { sut, repository } = makeSut();
  //     const correctLoginUserModel: UserModel.Login = {
  //       email: "valid@mail.com",
  //       password:
  //         "U2FsdGVkX1/LZGZ3IxCV/9pTJsi1GVaC+ODHlRBSiONsouJSPLhiIBxvGBxVXY6N0CU6V20LM4moUSCYgpcqxA==",
  //     };
  //     vitest.spyOn(repository, "findByEmail").mockReturnValue(
  //       Promise.resolve({
  //         name: "valid name",
  //         email: "valid@mail.com",
  //         password:
  //           "$2b$10$IH2x3ITe8JCh2BOXYI7LAuctfuz.fO.R7TX1hNGKiQQPG7Fe2gyIa",
  //       })
  //     );
  //     const user = (await sut.execute(correctLoginUserModel))
  //       .value as UserModel.Return;
  //     expect(user.email).toEqual("valid@mail.com");
  //   });
});
