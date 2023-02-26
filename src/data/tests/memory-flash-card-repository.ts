import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { FlashCardRepository } from "../protocols/flash-card-repository";

export class InMemoryFlashCardRepository implements FlashCardRepository {
  async updateFlashCard(
    id: string,
    data: FlashCardModel.Model
  ): Promise<FlashCardModel.Model> {
    const flashCardFounded = this.db.find((flashCard) => flashCard.id === id);
    if (flashCardFounded) {
      const updatedFlashCard = { ...flashCardFounded, ...data };
      this.db = this.db.map((flashCard) =>
        flashCard.id === id ? updatedFlashCard : flashCard
      );
      return updatedFlashCard;
    }
    throw new Error("Flash card not found");
  }
  private db: FlashCardModel.Model[] = [];

  async getFlashCardsByCategory(data: string): Promise<FlashCardModel.Model[]> {
    const flashCardsFounded: FlashCardModel.Model[] = [];
    this.db.forEach((flashCard) => {
      if (flashCard.category === data) {
        flashCardsFounded.push(flashCard);
      }
    });
    return flashCardsFounded ?? [];
  }

  async findByUserId(data: string): Promise<FlashCardModel.Model[]> {
    const flashCardsFounded: FlashCardModel.Model[] = [];
    this.db.forEach((flashCard) => {
      if (flashCard.user_id === data) {
        flashCardsFounded.push(flashCard);
      }
    });
    return flashCardsFounded ?? [];
  }

  async save(data: FlashCardModel.Model): Promise<FlashCardModel.Model> {
    this.db.push(data);
    return data;
  }
}
