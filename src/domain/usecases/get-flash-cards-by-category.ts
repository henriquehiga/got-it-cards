import { Either, left, right } from "../../shared/either";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { FlashCardRepository } from "./../../data/protocols/flash-card-repository";
import { ErrorResponse } from "./../../shared/error-response";
export class GetFlashCardsByCategory {
  constructor(private readonly flashCardRepository: FlashCardRepository) {}

  async execute(
    category: string
  ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
    try {
      const flashCardsByCategory =
        await this.flashCardRepository.getFlashCardsByCategory(category);
      return right(flashCardsByCategory);
    } catch (err) {
      return left({
        msg: "Erro ao resgatar FLASHCARDS por categoria",
      });
    }
  }
}
