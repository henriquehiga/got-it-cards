import { UserRepository } from "../../data/protocols/user-repository";
import { Crypto } from "../../libs/crypto";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";
import { UserModel } from "../entities/models/user-model";
import { WrongLoginDataError } from "./errors/wrong-login-data-error";

export class LoginUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(
    data: UserModel.Login
  ): Promise<Either<ErrorResponse, UserModel.Return>> {
    let userOrNull: UserModel.Model | null;
    try {
      userOrNull = await this.userRepo.findByEmail(data.email);
      let decryptedPassword = Crypto.decrypt(userOrNull?.password ?? "");
      const samePassword = Crypto.compareHash(
        decryptedPassword,
        userOrNull?.password ?? ""
      );
      if (!samePassword || !userOrNull) {
        return left({
          error: new WrongLoginDataError(),
          msg: new WrongLoginDataError().message,
        });
      }
    } catch (err) {
      const error = new UnexpectedServerError(
        "LoginUser Usecase > userRepo.findByEmail"
      );
      return left({
        error: error,
        msg: error.message,
      });
    }
    return right({
      email: userOrNull.email,
      name: userOrNull.name,
    });
  }
}
