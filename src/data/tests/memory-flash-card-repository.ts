import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { FlashCardRepository } from "../protocols/flash-card-repository";

export class InMemoryFlashCardRepository implements FlashCardRepository {
  private db: FlashCardModel.Model[] = [];

  async save(data: FlashCardModel.Model): Promise<FlashCardModel.Model> {
    this.db.push(data);
    return data;
  }
}
