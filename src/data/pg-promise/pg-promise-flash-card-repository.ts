import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { db } from "../../infra/pg-promise";
import { FlashCardRepository } from "./../protocols/flash-card-repository";

enum FlashCardRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.flash_cards(id, question, awnser, category, dificulty, type) VALUES (${id}, ${question}, ${awnser}, ${category}, ${dificulty}, ${type});",
}

export class PgPromiseFlashCardRepository implements FlashCardRepository {
  async save(data: FlashCardModel.Model): Promise<FlashCardModel.Model> {
    try {
      await db.connect();
      await db.none(FlashCardRepositoryQueries.SAVE, data);
      return data;
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }
}