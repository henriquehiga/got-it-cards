import { CategoryRepository } from "./../../data/protocols/category-repository";
import { PersistNewCategory } from "../../domain/usecases/persist-new-category";
import { PgPromiseCategoryRepository } from "../../data/pg-promise/pg-promise-category-repository";
import { PersistNewCategoryController } from "../../presentations/controllers/persist-new-category-controller";

export const makePersisteNewCategoryController = () => {
  const categoryRepo = new PgPromiseCategoryRepository();
  const persistNewCategoryUsecase = new PersistNewCategory(categoryRepo);
  const controller = new PersistNewCategoryController(
    persistNewCategoryUsecase
  );
  return controller;
};
