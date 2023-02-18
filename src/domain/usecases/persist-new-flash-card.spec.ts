import { PersistNewFlashCard } from "./persist-new-flash-card";
import { FlashCard } from "./../entities/flash-card";
import { MissingFieldError } from "./../entities/errors/missing-field-error";
import { ErrorResponse } from "./../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { describe, expect, it } from "vitest";

describe("PersistNewFlashCard Usecase", () => {
  it("should not be able to create a new flash card if entity validation fails", async () => {
    const sut = new PersistNewFlashCard();
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

  it("should be able to create a new flash card", async () => {
    const sut = new PersistNewFlashCard();
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
