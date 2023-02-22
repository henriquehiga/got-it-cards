import { InMemoryCategoryRepository } from "./../../data/tests/memory-category-repository";
import { CategoryRepository } from "./../../data/protocols/category-repository";
import { GetCategoriesByUserId } from "./get-categories-by-user-id";
import { UserRepository } from "./../../data/protocols/user-repository";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { ErrorResponse } from "./../../shared/error-response";
import { describe, expect, it, vitest } from "vitest";
import { InexistentUserIdError } from "./errors/inexistent-user-id-error";
import { CategoryModel } from "../entities/models/category-model";

type sutTypes = {
  sut: GetCategoriesByUserId;
  categoryRepository: CategoryRepository;
  userRepository: UserRepository;
};

const makeSut = (): sutTypes => {
  const userRepo: UserRepository = new InMemoryUserRepository();
  const categoryRepo: CategoryRepository = new InMemoryCategoryRepository();
  const sut = new GetCategoriesByUserId(categoryRepo, userRepo);
  return {
    sut,
    categoryRepository: categoryRepo,
    userRepository: userRepo,
  };
};

describe("GetCategoriesByUserId Usecase", () => {
  it("should not be able to retrieve categories if user_id provided does not exist", async () => {
    const { sut } = makeSut();
    const inexistentUserIdValue: string = "inexistent@userid.com";
    const error = (await sut.execute(inexistentUserIdValue))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(InexistentUserIdError);
    expect(error.msg).toEqual(new InexistentUserIdError().message);
  });

  it("should retrieve categories if valid data is provided", async () => {
    const { sut, userRepository } = makeSut();
    const existsUserIdValue: string = "exists@userid.com";
    vitest.spyOn(userRepository, "findByEmail").mockReturnValue(
      Promise.resolve({
        email: "",
        last_login: "",
        name: "",
        password: "",
      })
    );
    const voidArray = (await sut.execute(existsUserIdValue))
      .value as CategoryModel.Model[];
    expect(voidArray).toBeInstanceOf(Array<CategoryModel.Model>);
  });
});
