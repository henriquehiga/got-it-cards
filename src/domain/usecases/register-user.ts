import { UserRepository } from "../../data/protocols/user-repository";
import { Crypto } from "../../libs/crypto";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";
import { UserModel } from "../entities/models/user-model";
import { User } from "../entities/user";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export class RegisterUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(
    data: UserModel.Create
  ): Promise<Either<ErrorResponse, UserModel.Return>> {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      const userAlreadyExistsError = new UserAlreadyExistsError();
      return left({
        error: userAlreadyExistsError,
        msg: userAlreadyExistsError.message,
      });
    }
    const decryptedPassword = Crypto.decrypt(data.password);
    const hashedPassword = Crypto.hash(decryptedPassword);
    data = {
      ...data,
      password: hashedPassword,
    };
    const userOrError = User.create({
      ...data,
      last_login: "0000-00-00",
    });
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    try {
      await this.userRepo.save(userOrError.value.props);
    } catch (error: Error | any) {
      const unexpectedServerError = new UnexpectedServerError(
        "RegisterUser > userRepo.save"
      );
      return left({
        error: unexpectedServerError,
        msg: unexpectedServerError.message,
      });
    }
    return right({
      email: userOrError.value.props.email,
      name: userOrError.value.props.name,
    });
  }
}
