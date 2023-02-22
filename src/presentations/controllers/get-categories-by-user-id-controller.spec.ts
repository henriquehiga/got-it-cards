import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { GetCategoriesByUserIdController } from "./get-categories-by-user-id-controller";
import { GetCategoriesByUserId } from "./../../domain/usecases/get-categories-by-user-id";
import { InMemoryCategoryRepository } from "../../data/tests/memory-category-repository";
import { CategoryModel } from "../../domain/entities/models/category-model";
import { ErrorResponse } from "../../shared/error-response";
import { Either, left, right } from "../../shared/either";
import { describe, expect, it, vitest } from "vitest";

type sutTypes = {
  sut: GetCategoriesByUserIdController;
  usecase: GetCategoriesByUserId;
};

const makeSut = (): sutTypes => {
  const userRepository = new InMemoryUserRepository();
  const categoryRepository = new InMemoryCategoryRepository();
  class MockGetCategoriesByUserIdUsecase extends GetCategoriesByUserId {
    async execute(
      data: string
    ): Promise<Either<ErrorResponse, CategoryModel.Model[]>> {
      return right([] as CategoryModel.Model[]);
    }
  }
  const usecaseStub = new MockGetCategoriesByUserIdUsecase(
    categoryRepository,
    userRepository
  );
  const controller = new GetCategoriesByUserIdController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("GetCategoriesByUserId Controller", () => {
  it("should returns 400 if usecase returns left true", async () => {
    const { sut, usecase } = makeSut();
    vitest
      .spyOn(usecase, "execute")
      .mockReturnValue(Promise.resolve(left({ msg: "usecase_error" })));
    const response = await sut.handle({
      body: null,
      params: { userId: "valid_user_id" },
    });
    expect(response.statusCode).toBe(400);
  });

  it("should returns 200 if usecase returns right true", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      body: {},
      params: { userId: "valid_user_id" },
    });
    expect(response.statusCode).toBe(200);
  });
});
