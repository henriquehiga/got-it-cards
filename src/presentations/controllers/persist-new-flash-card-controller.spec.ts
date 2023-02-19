import { PersistNewFlashCardController } from "./persist-new-flash-card-controller";
import { InMemoryFlashCardRepository } from "./../../data/tests/memory-flash-card-repository";
import { PersistNewFlashCard } from "./../../domain/usecases/persist-new-flash-card";
import { MissingFieldError } from "./../../domain/entities/errors/missing-field-error";
import { describe, expect, it, vitest } from "vitest";
import { FlashCard } from "../../domain/entities/flash-card";
import { FlashCardModel } from "../../domain/entities/models/flash-card-model";
import { Either, left, right } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { HttpRequest, HttpResponse } from "../protocols/http";

type sutTypes = {
  sut: PersistNewFlashCardController;
  usecase: PersistNewFlashCard;
};

const makeSut = (): sutTypes => {
  const repository = new InMemoryFlashCardRepository();
  class MockPersistNewFlashCardUsecase extends PersistNewFlashCard {
    async execute(
      data: FlashCardModel.Create
    ): Promise<Either<ErrorResponse, FlashCard>> {
      return right(
        new FlashCard({
          id: "valid-id",
          ...data,
        })
      );
    }
  }
  const usecaseStub = new MockPersistNewFlashCardUsecase(repository);
  const controller = new PersistNewFlashCardController(usecaseStub);
  return {
    sut: controller,
    usecase: usecaseStub,
  };
};

describe("PersistNewFlashCardController", () => {
  it("should return 400 if question field is not provided", async () => {
    const { sut, usecase } = makeSut();
    const request: HttpRequest = {
      body: {
        question: "",
        awnser: "valid awnser",
        category: "valid category",
        dificulty: 1,
        type: "valid type",
      },
      param: {
        id: "",
      },
    };
    const missingFieldError = new MissingFieldError("question");
    vitest.spyOn(usecase, "execute").mockResolvedValueOnce(
      left({
        error: missingFieldError,
        msg: missingFieldError.message,
      })
    );
    const response: HttpResponse = await sut.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(missingFieldError.message);
  });

  it("should return 201 if valid data is provided", async () => {
    const { sut } = makeSut();
    const request: HttpRequest = {
      body: {
        question: "valid question",
        awnser: "valid awnser",
        category: "valid category",
        dificulty: 1,
        type: "valid type",
      },
      param: {
        id: "",
      },
    };
    const response: HttpResponse = await sut.handle(request);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("question");
  });
});
