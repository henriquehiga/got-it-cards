import { PgPromiseFlashCardRepository } from "../../data/pg-promise/pg-promise-flash-card-repository";
import { BuildDeckFlashCards } from "../../domain/usecases/build-deck-flash-cards";
import { GetFlashCardsByCategoryId } from "../../domain/usecases/get-flash-cards-by-category-id";
import { BuildDeckFlashCardsController } from "../../presentations/controllers/build-deck-flash-cards-controller";
import { Controller } from "../../presentations/protocols/controller";

export const makeBuildDeckFlashCardsController = (): Controller => {
  const pgPromiseFlashCardRepository = new PgPromiseFlashCardRepository();
  const getFlashCardsByCategory = new GetFlashCardsByCategoryId(
    pgPromiseFlashCardRepository
  );
  const buildDeckFlashCards = new BuildDeckFlashCards(getFlashCardsByCategory);
  return new BuildDeckFlashCardsController(buildDeckFlashCards);
};
