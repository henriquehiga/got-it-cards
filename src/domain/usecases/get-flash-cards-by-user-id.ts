import { FlashCardRepository } from "../../data/protocols/flash-card-repository";
import { UserRepository } from "../../data/protocols/user-repository";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { InexistentUserIdError } from "./errors/inexistent-user-id-error";

export class GetFlashCardsByUserId {
  constructor(
    private readonly flashCardRepo: FlashCardRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(
    userId: string
  ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
    const user = await this.userRepo.findByEmail(userId);
    if (!user) {
      const inexistentUserIdError = new InexistentUserIdError();
      return left({
        error: inexistentUserIdError,
        msg: inexistentUserIdError.message,
      });
    }
    const flashCards = await this.flashCardRepo.findByUserId(user.email);
    return right(flashCards);
  }
}
