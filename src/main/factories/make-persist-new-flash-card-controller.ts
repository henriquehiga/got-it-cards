import { PgPromiseFlashCardRepository } from "../../data/pg-promise/pg-promise-flash-card-repository";
import { PersistNewFlashCard } from "../../domain/usecases/persist-new-flash-card";
import { PersistNewFlashCardController } from "../../presentations/controllers/persist-new-flash-card-controller";
import { Controller } from "../../presentations/protocols/controller";

export const makePersistNewFlashCardController = (): Controller => {
  const repository = new PgPromiseFlashCardRepository();
  const usecase = new PersistNewFlashCard(repository);
  const controller = new PersistNewFlashCardController(usecase);
  return controller;
};
