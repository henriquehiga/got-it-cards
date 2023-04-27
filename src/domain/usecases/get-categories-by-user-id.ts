import { UserRepository } from "../../data/protocols/user-repository";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { CategoryModel } from "../entities/models/category-model";
import { CategoryRepository } from "./../../data/protocols/category-repository";
import { InexistentUserIdError } from "./errors/inexistent-user-id-error";

export class GetCategoriesByUserId {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(
    userId: string
  ): Promise<Either<ErrorResponse, CategoryModel.Model[]>> {
    const user = await this.userRepo.findByEmail(userId);
    if (!user) {
      const inexistentUserIdError = new InexistentUserIdError();
      return left({
        error: inexistentUserIdError,
        msg: inexistentUserIdError.message,
      });
    }
    const categories = await this.categoryRepo.findByUserId(user.email);
    return right(categories);
  }
}
