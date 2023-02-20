import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { FlashCardRepository } from "../protocols/flash-card-repository";

export class InMemoryFlashCardRepository implements FlashCardRepository {
  private db: FlashCardModel.Model[] = [];

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
