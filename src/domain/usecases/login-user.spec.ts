import { describe, expect, it, vitest } from "vitest";
import { UserRepository } from "../../data/protocols/user-repository";
import { CryptoProtocol } from "../../libs/adpters/protocols/crypto-protocol";
import { UserModel } from "../entities/models/user-model";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { ErrorResponse } from "./../../shared/error-response";
import { WrongLoginDataError } from "./errors/wrong-login-data-error";
import { LoginUser } from "./login-user";

type sutTypes = {
  sut: LoginUser;
  repository: UserRepository;
  cryptoAdapterMock: CryptoProtocol;
};

const makeSut = (): sutTypes => {
  const repository: UserRepository = new InMemoryUserRepository();
  class CryptoAdapterMock implements CryptoProtocol {
    decrypt(data: string): string {
      return "";
    }
    compareHash(data: string, hash: string): boolean {
      return true;
    }
  }
  const cryptoAdapterMock = new CryptoAdapterMock();
  const sut = new LoginUser(repository, cryptoAdapterMock);
  return {
    sut,
    repository,
    cryptoAdapterMock,
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

  it("should login if correct data is provided", async () => {
    const { sut, repository } = makeSut();
    const correctLoginUserModel: UserModel.Login = {
      email: "valid@mail.com",
      password: "valid-password",
    };
    vitest.spyOn(repository, "findByEmail").mockReturnValue(
      Promise.resolve({
        email: "valid@mail.com",
        name: "valid name",
        password: "",
        last_login: "",
      })
    );
    const user = (await sut.execute(correctLoginUserModel))
      .value as UserModel.Return;
    expect(user.email).toEqual("valid@mail.com");
    expect(user).toHaveProperty("token");
  });
});
