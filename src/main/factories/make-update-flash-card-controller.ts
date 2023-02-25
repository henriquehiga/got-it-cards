import { UpdateFlashCardInfo } from "../../domain/usecases/update-flash-card-info";
import { UpdateFlashCardController } from "../../presentations/controllers/update-flash-card-controller";
import { Controller } from "../../presentations/protocols/controller";
import { PgPromiseFlashCardRepository } from "./../../data/pg-promise/pg-promise-flash-card-repository";

export const makeUpdateFlashCardController = (): Controller => {
  const flashCardRepository = new PgPromiseFlashCardRepository();
  const usecase = new UpdateFlashCardInfo(flashCardRepository);
  return new UpdateFlashCardController(usecase);
};
