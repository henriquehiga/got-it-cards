import { PgPromiseUserRepository } from "../../data/pg-promise/pg-promise-user-repository";
import { Controller } from "../../presentations/protocols/controller";
import { PgPromiseCategoryRepository } from "../../data/pg-promise/pg-promise-category-repository";
import { GetCategoriesByUserId } from "../../domain/usecases/get-categories-by-user-id";
import { GetCategoriesByUserIdController } from "../../presentations/controllers/get-categories-by-user-id-controller";

export const makeGetCategoriesByUserId = (): Controller => {
  const userRepository = new PgPromiseUserRepository();
  const categoryRepository = new PgPromiseCategoryRepository();
  const usecase = new GetCategoriesByUserId(categoryRepository, userRepository);
  const controller = new GetCategoriesByUserIdController(usecase);
  return controller;
};
