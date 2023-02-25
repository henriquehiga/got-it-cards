import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { FlashCardRepository } from "./../../data/protocols/flash-card-repository";

export class UpdateFlashCardInfo {
  constructor(private readonly flashCardRepository: FlashCardRepository) {}

  async execute(
    flashCard: FlashCardModel.Model
  ): Promise<Either<ErrorResponse, FlashCardModel.Model>> {
    try {
      const formatedDate = new Date().toISOString().substring(0, 10);
      const updatedFlashCard = await this.flashCardRepository.updateFlashCard(
        flashCard.id,
        {
          ...flashCard,
          last_review: formatedDate,
        }
      );
      return right(updatedFlashCard);
    } catch (error: any) {
      return left({
        error: new Error("Error updating flash card"),
        message: error.message,
      });
    }
  }
}
