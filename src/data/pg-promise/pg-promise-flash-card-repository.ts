import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { db } from "../../infra/pg-promise";
import { FlashCardRepository } from "./../protocols/flash-card-repository";

enum FlashCardRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.flash_cards(id, user_id, question, awnser, category, dificulty, type, created_at, updated_at) VALUES (${id}, ${user_id}, ${question}, ${awnser}, ${category}, ${dificulty}, ${type}, ${created_at}, ${updated_at});",
  FIND_BY_USER_ID = "SELECT * FROM gotitcards.flash_cards WHERE user_id = $1;",
}

export class PgPromiseFlashCardRepository implements FlashCardRepository {
  async findByUserId(data: string): Promise<FlashCardModel.Model[]> {
    try {
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
      await db.none(FlashCardRepositoryQueries.SAVE, data);
      return data;
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }
}
