import { GetFlashCardsByUserIdController } from "./../../presentations/controllers/get-flash-cards-by-user-id-controller";
import { GetFlashCardsByUserId } from "./../../domain/usecases/get-flash-cards-by-user-id";
import { PgPromiseUserRepository } from "../../data/pg-promise/pg-promise-user-repository";
import { Controller } from "../../presentations/protocols/controller";
import { PgPromiseFlashCardRepository } from "../../data/pg-promise/pg-promise-flash-card-repository";

export const makeGetFlashCardsByUserIdController = (): Controller => {
  const userRepository = new PgPromiseUserRepository();
  const flashCardRepository = new PgPromiseFlashCardRepository();
  const usecase = new GetFlashCardsByUserId(
    flashCardRepository,
    userRepository
  );
  const controller = new GetFlashCardsByUserIdController(usecase);
  return controller;
};
