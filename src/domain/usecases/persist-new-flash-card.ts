import { IdGenerator } from "../../libs/id-generator";
import { FlashCardRepository } from "./../../data/protocols/flash-card-repository";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { FlashCard } from "../entities/flash-card";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";

export class PersistNewFlashCard {
  constructor(private readonly flashCardRepo: FlashCardRepository) {}

  async execute(
    data: FlashCardModel.Create
  ): Promise<Either<ErrorResponse, FlashCardModel.Model>> {
    let id = IdGenerator.get();
    const formatedDate = new Date().toISOString().substring(0, 10);
    const dataWithId: FlashCardModel.Model = {
      id,
      ...data,
      created_at: formatedDate,
      updated_at: formatedDate,
    };
    const flashCardOrError = FlashCard.create(dataWithId);
    if (flashCardOrError.isLeft()) {
      return left(flashCardOrError.value);
    }
    try {
      await this.flashCardRepo.save(flashCardOrError.value.props);
    } catch (error: Error | any) {
      const unexpectedServerError = new UnexpectedServerError(
        "PersistNewFlashCard > flashCardRepo.save"
      );
      return left({
        error: unexpectedServerError,
        msg: unexpectedServerError.message,
      });
    }
    return right(flashCardOrError.value.props);
  }
}
