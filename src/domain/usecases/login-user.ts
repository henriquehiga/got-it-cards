import { UserRepository } from "../../data/protocols/user-repository";
import { Crypto } from "../../libs/crypto";
import { JwtToken } from "../../libs/jwt-token";
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
    try {
      const user = await this.userRepo.findByEmail(data.email);
      if (!user) {
        const error = new WrongLoginDataError();
        return left({ error, msg: error.message });
      }
      const decryptedPassword = Crypto.decrypt(data.password);
      const isPasswordValid = Crypto.compareHash(
        decryptedPassword,
        user.password
      );
      if (!isPasswordValid) {
        const error = new WrongLoginDataError();
        return left({ error, msg: error.message });
      }
      const token = JwtToken.get({ role: "COMMON", email: user.email });
      return right({ email: user.email, name: user.name, token });
    } catch (error) {
      console.error(error);
      const unexpectedError = new UnexpectedServerError(
        "LoginUser Usecase > userRepo.findByEmail"
      );
      return left({ error: unexpectedError, msg: unexpectedError.message });
    }
  }
}
