import { IdGenerator } from "../../libs/id-generator";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";
import { UserRepository } from "../../data/protocols/user-repository";
import { UserModel } from "../entities/models/user-model";
import { User } from "../entities/user";

export class RegisterUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(data: UserModel.Create): Promise<Either<ErrorResponse, User>> {
    const userOrError = User.create(data);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    try {
      await this.userRepo.save(userOrError.value.props);
    } catch (error: Error | any) {
      const unexpectedServerError = new UnexpectedServerError(
        "PersistNewFlashCard > flashCardRepo.save"
      );
      return left({
        error: unexpectedServerError,
        msg: unexpectedServerError.message,
      });
    }
    return right(userOrError.value);
  }
}
