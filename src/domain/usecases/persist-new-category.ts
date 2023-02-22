import { Category } from "./../entities/category";
import { IdGenerator } from "../../libs/id-generator";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";
import { CategoryRepository } from "../../data/protocols/category-repository";
import { CategoryModel } from "../entities/models/category-model";

export class PersistNewCategory {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(
    data: CategoryModel.Create
  ): Promise<Either<ErrorResponse, CategoryModel.Model>> {
    let id = IdGenerator.get();
    const dataWithId: CategoryModel.Model = {
      id,
      ...data,
    };
    const categoryOrError = Category.create(dataWithId);
    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value);
    }
    try {
      await this.categoryRepo.save(categoryOrError.value.props);
    } catch (error: Error | any) {
      const unexpectedServerError = new UnexpectedServerError(
        "PersistNewCategory > categoryRepo.save"
      );
      return left({
        error: unexpectedServerError,
        msg: unexpectedServerError.message,
      });
    }
    return right(categoryOrError.value.props);
  }
}
