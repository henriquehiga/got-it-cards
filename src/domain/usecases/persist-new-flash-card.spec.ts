import { InMemoryFlashCardRepository } from "./../../data/tests/memory-flash-card-repository";
import { PersistNewFlashCard } from "./persist-new-flash-card";
import { FlashCard } from "./../entities/flash-card";
import { MissingFieldError } from "./../entities/errors/missing-field-error";
import { ErrorResponse } from "./../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { describe, expect, it, vitest } from "vitest";
import { FlashCardRepository } from "../../data/protocols/flash-card-repository";
import { UnexpectedServerError } from "../../shared/error/unexpected-server-error";

type sutTypes = {
  sut: PersistNewFlashCard;
  repository: FlashCardRepository;
};

const makeSut = (): sutTypes => {
  const repository: FlashCardRepository = new InMemoryFlashCardRepository();
  const sut = new PersistNewFlashCard(repository);
  return {
    sut,
    repository,
  };
};

describe("PersistNewFlashCard Usecase", () => {
  it("should not be able to create a new flash card if entity validation fails", async () => {
    const { sut } = makeSut();
    const invalidCreateFlashCardModel: FlashCardModel.Create = {
      awnser: "",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const error = (await sut.execute(invalidCreateFlashCardModel))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(MissingFieldError);
    expect(error.msg).toEqual(new MissingFieldError("awnser").message);
  });

  it("should not be able to create a new flash card if repository fails", async () => {
    const { sut, repository } = makeSut();
    const validCreateFlashCardModel: FlashCardModel.Create = {
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    vitest.spyOn(repository, "save").mockRejectedValue(null);
    const error = (await sut.execute(validCreateFlashCardModel))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(UnexpectedServerError);
    expect(error.msg).toEqual(
      new UnexpectedServerError("PersistNewFlashCard > flashCardRepo.save")
        .message
    );
  });

  it("should be able to create a new flash card", async () => {
    const { sut } = makeSut();
    const validCreateFlashCardModel: FlashCardModel.Create = {
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const flashCard = (await sut.execute(validCreateFlashCardModel))
      .value as FlashCard;
    expect(flashCard).toBeInstanceOf(FlashCard);
  });
});
