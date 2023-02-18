import { randomUUID } from "crypto";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { FlashCard } from "../entities/flash-card";

export class PersistNewFlashCard {
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
    return right(flashCardOrError.value);
  }
}
