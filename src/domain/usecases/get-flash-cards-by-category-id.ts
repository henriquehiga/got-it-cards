import { FlashCardRepository } from "../../data/protocols/flash-card-repository";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";
import { FlashCardModel } from "../entities/models/flash-card-model";
export class GetFlashCardsByCategoryId {
  constructor(private readonly flashCardRepository: FlashCardRepository) {}

  async execute(
    id: string
  ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
    try {
      const flashCardsByCategory =
        await this.flashCardRepository.getFlashCardsByCategoryId(id);
      return right(flashCardsByCategory);
    } catch (err) {
      const error = new UnexpectedServerError(
        "GetFlashCardsByCategory > flashCardRepository.getFlashCardsBycategory"
      );
      return left({
        error,
        msg: error.message,
      });
    }
  }
}
