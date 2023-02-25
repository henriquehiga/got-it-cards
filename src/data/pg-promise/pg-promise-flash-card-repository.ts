import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { db } from "../../infra/pg-promise";
import { FlashCardRepository } from "./../protocols/flash-card-repository";

enum FlashCardRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.flash_cards(id, user_id, question, awnser, category, dificulty, type, last_review, created_at, updated_at) VALUES (${id}, ${user_id}, ${question}, ${awnser}, ${category}, ${dificulty}, ${type}, ${last_review}, ${created_at}, ${updated_at});",
  FIND_BY_USER_ID = "SELECT * FROM gotitcards.flash_cards WHERE user_id = $1;",
  GET_FLASH_CARDS_BY_CATEGORY = "SELECT * FROM gotitcards.flash_cards WHERE category = $1;",
  UPDATE_FLASH_CARD = "UPDATE gotitcards.flash_cards SET question = ${question}, awnser = ${awnser}, category = ${category}, dificulty = ${dificulty}, type = ${type}, last_review = ${last_review}, updated_at = ${updated_at} WHERE id = ${id};",
}

export class PgPromiseFlashCardRepository implements FlashCardRepository {
  async updateFlashCard(
    id: string,
    data: FlashCardModel.Model
  ): Promise<FlashCardModel.Model> {
    try {
      await db.none(FlashCardRepositoryQueries.UPDATE_FLASH_CARD, {
        ...data,
        id,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }

  async getFlashCardsByCategory(data: string): Promise<FlashCardModel.Model[]> {
    try {
      const flashCards = await db.manyOrNone<FlashCardModel.Model>(
        FlashCardRepositoryQueries.GET_FLASH_CARDS_BY_CATEGORY,
        data
      );
      return flashCards ?? [];
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }

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
