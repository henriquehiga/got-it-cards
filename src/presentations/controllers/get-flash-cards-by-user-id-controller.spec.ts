import { GetFlashCardsByUserIdController } from "./get-flash-cards-by-user-id-controller";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { GetFlashCardsByUserId } from "./../../domain/usecases/get-flash-cards-by-user-id";
import { InMemoryFlashCardRepository } from "./../../data/tests/memory-flash-card-repository";
import { describe, expect, it, vitest } from "vitest";
import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { Either, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { HttpRequest } from "../protocols/http";

type sutTypes = {
  sut: GetFlashCardsByUserIdController;
  usecase: GetFlashCardsByUserId;
};

const makeSut = (): sutTypes => {
  const userRepo = new InMemoryUserRepository();
  const flashCardRepo = new InMemoryFlashCardRepository();
  class MockGetFlashCardsByUserIdUsecase extends GetFlashCardsByUserId {
    async execute(
      data: string
    ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
      return right([
        {
          id: "valid-id",
          awnser: "awnser",
          type: "type",
          question: "question",
          dificulty: 1,
          user_id: "awuser_idnser",
          category: "category",
        } as FlashCardModel.Model,
      ]);
    }
  }
  const usecaseStub = new MockGetFlashCardsByUserIdUsecase(
    flashCardRepo,
    userRepo
  );
  const controller = new GetFlashCardsByUserIdController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("GetFlashCardsByUserIdController", () => {
  it("should call usecase", async () => {
    const { sut, usecase } = makeSut();
    const request: HttpRequest = {
      body: {
        user_id: "valid@mail.com",
      },
      param: {
        id: "",
      },
    };
    const usecaseSpy = vitest.spyOn(usecase, "execute");
    await sut.handle(request);
    expect(usecaseSpy).toHaveBeenCalledWith(request.body.user_id);
  });
});
