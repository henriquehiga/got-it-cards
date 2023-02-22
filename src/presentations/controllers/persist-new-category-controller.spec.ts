import { InMemoryCategoryRepository } from "./../../data/tests/memory-category-repository";
import { PersistNewCategoryController } from "./persist-new-category-controller";
import { PersistNewCategory } from "./../../domain/usecases/persist-new-category";
import { CategoryModel } from "../../domain/entities/models/category-model";
import { ErrorResponse } from "../../shared/error-response";
import { Either, left, right } from "../../shared/either";
import { describe, expect, it, vitest } from "vitest";

type sutTypes = {
  sut: PersistNewCategoryController;
  usecase: PersistNewCategory;
};

const makeSut = (): sutTypes => {
  const repository = new InMemoryCategoryRepository();
  class MockPersistNewCategoryUsecase extends PersistNewCategory {
    async execute(
      data: CategoryModel.Create
    ): Promise<Either<ErrorResponse, CategoryModel.Model>> {
      return right({
        id: "valid-id",
        ...data,
      });
    }
  }
  const usecaseStub = new MockPersistNewCategoryUsecase(repository);
  const controller = new PersistNewCategoryController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("PersistNewCategory Controller", () => {
  it("should returns 400 if usecase returns left true", async () => {
    const { sut, usecase } = makeSut();
    vitest
      .spyOn(usecase, "execute")
      .mockReturnValue(Promise.resolve(left({ msg: "usecase_error" })));
    const response = await sut.handle({ body: null, params: {} });
    expect(response.statusCode).toBe(400);
  });

  it("should returns 201 if usecase returns right true", async () => {
    const { sut, usecase } = makeSut();
    const validDataReturnRightUsecase = {} as any;
    vitest
      .spyOn(usecase, "execute")
      .mockReturnValue(Promise.resolve(right(validDataReturnRightUsecase)));
    const response = await sut.handle({ body: {}, params: {} });
    expect(response.statusCode).toBe(201);
  });
});
