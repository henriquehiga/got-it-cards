import { FlashCardRepository } from "./../../data/protocols/flash-card-repository";
import { randomUUID } from "crypto";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { FlashCard } from "../entities/flash-card";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";

export class PersistNewFlashCard {
  constructor(private readonly flashCardRepo: FlashCardRepository) {}

  async execute(
    data: FlashCardModel.Create
  ): Promise<Either<ErrorResponse, FlashCard>> {
    let id = randomUUID();
    const dataWithId = {
      id,
      ...data,
    };
    const flashCardOrError = FlashCard.create(dataWithId);
    if (flashCardOrError.isLeft()) {
      return left(flashCardOrError.value);
    }
    try {
      await this.flashCardRepo.save(flashCardOrError.value.props);
    } catch (error: Error | any) {
      return left({
        error: new UnexpectedServerError(""),
        msg: new UnexpectedServerError(
          "PersistNewFlashCard > flashCardRepo.save"
        ).message,
      });
    }
    return right(flashCardOrError.value);
  }
}
