import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { db } from "../../infra/pg-promise";
import { FlashCardRepository } from "./../protocols/flash-card-repository";

enum FlashCardRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.flash_cards(id, user_id, question, awnser, category, dificulty, type) VALUES (${id}, ${user_id}, ${question}, ${awnser}, ${category}, ${dificulty}, ${type});",
  FIND_BY_USER_ID = "SELECT * FROM gotitcards.flash_cards WHERE user_id = $1",
}

export class PgPromiseFlashCardRepository implements FlashCardRepository {
  async findByUserId(data: string): Promise<FlashCardModel.Model[]> {
    try {
      await db.connect();
      const flashCards = await db.manyOrNone<FlashCardModel.Model>(
        FlashCardRepositoryQueries.FIND_BY_USER_ID,
        data
      );
      return flashCards ?? [];
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }

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
