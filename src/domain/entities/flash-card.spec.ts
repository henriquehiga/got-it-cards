import { describe, expect, it, test } from "vitest";
import { FlashCard } from "./flash-card";
import { FlashCardModel } from "./models/flash-card-model";
import { MissingFieldError } from "./errors/missing-field-error";
import { ErrorResponse } from "../../shared/error-response";

describe("FlashCard Entity", () => {
  it("should return a flashcard if correct data is provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const flashCard = FlashCard.create(data).value as FlashCard;
    expect(flashCard).toBeInstanceOf(FlashCard);
    expect(flashCard.props).toEqual(data);
    expect(flashCard.props.id).toBe("valid-id");
  });

  it("should return an MissingFieldError if ID is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "",
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("id"));
    expect(error.msg).toEqual(new MissingFieldError("id").message);
  });

  it("should return an MissingFieldError if AWNSER is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("awnser"));
    expect(error.msg).toEqual(new MissingFieldError("awnser").message);
  });

  it("should return an MissingFieldError if CATEGORY is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "valid awnser",
      category: "",
      dificulty: 1,
      question: "valid question",
      type: "valid type",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("category"));
    expect(error.msg).toEqual(new MissingFieldError("category").message);
  });

  it("should return an MissingFieldError if DIFICULTY is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 0,
      question: "valid question",
      type: "valid type",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("dificulty"));
    expect(error.msg).toEqual(new MissingFieldError("dificulty").message);
  });

  it("should return an MissingFieldError if QUESTION is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "",
      type: "valid type",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("question"));
    expect(error.msg).toEqual(new MissingFieldError("question").message);
  });

  it("should return an MissingFieldError if TYPE is not provided", () => {
    const data: FlashCardModel.Model = {
      id: "valid-id",
      awnser: "valid awnser",
      category: "valid category",
      dificulty: 1,
      question: "valid question",
      type: "",
    };
    const error = FlashCard.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("type"));
    expect(error.msg).toEqual(new MissingFieldError("type").message);
  });
});
