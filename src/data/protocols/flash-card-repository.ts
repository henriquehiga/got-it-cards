import { FlashCardModel } from "../../domain/entities/models/flash-card-model";

export interface FlashCardRepository {
  save(data: FlashCardModel.Model): Promise<FlashCardModel.Model>;
}
