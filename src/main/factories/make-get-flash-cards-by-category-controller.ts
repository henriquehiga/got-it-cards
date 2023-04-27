import { PgPromiseFlashCardRepository } from "../../data/pg-promise/pg-promise-flash-card-repository";
import { GetFlashCardsByCategoryId } from "../../domain/usecases/get-flash-cards-by-category-id";
import { GetFlashCardsByCategoryController } from "../../presentations/controllers/get-flash-cards-by-category-controller";
import { Controller } from "../../presentations/protocols/controller";

export const makeGetFlashCardsByCategoryController = (): Controller => {
  const pgPromiseFlashCardRepository = new PgPromiseFlashCardRepository();
  const getFlashCardsByCategory = new GetFlashCardsByCategoryId(
    pgPromiseFlashCardRepository
  );
  return new GetFlashCardsByCategoryController(getFlashCardsByCategory);
};
