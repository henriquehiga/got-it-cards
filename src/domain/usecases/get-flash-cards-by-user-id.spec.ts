import { UserRepository } from "./../../data/protocols/user-repository";
import { InMemoryFlashCardRepository } from "./../../data/tests/memory-flash-card-repository";
import { FlashCardRepository } from "./../../data/protocols/flash-card-repository";
import { RegisterUser } from "./register-user";
import { InMemoryUserRepository } from "./../../data/tests/memory-user-repository";
import { MissingFieldError } from "./../entities/errors/missing-field-error";
import { ErrorResponse } from "./../../shared/error-response";
import { describe, expect, it, vitest } from "vitest";
import { GetFlashCardsByUserId } from "./get-flash-cards-by-user-id";
import { InexistentUserIdError } from "./errors/inexistent-user-id-error";
import { FlashCardModel } from "../entities/models/flash-card-model";

type sutTypes = {
  sut: GetFlashCardsByUserId;
  flashCardsRepository: FlashCardRepository;
  userRepository: UserRepository;
};

const makeSut = (): sutTypes => {
  const userRepo: UserRepository = new InMemoryUserRepository();
  const flashCardsRepo: FlashCardRepository = new InMemoryFlashCardRepository();
  const sut = new GetFlashCardsByUserId(flashCardsRepo, userRepo);
  return {
    sut,
    flashCardsRepository: flashCardsRepo,
    userRepository: userRepo,
  };
};

describe("GetFlashCardsByUserId Usecase", () => {
  it("should not be able to retrieve flash cards if user_id provided does not exist", async () => {
    const { sut } = makeSut();
    const inexistentUserIdValue: string = "inexistent@userid.com";
    const error = (await sut.execute(inexistentUserIdValue))
      .value as ErrorResponse;
    expect(error.error).toBeInstanceOf(InexistentUserIdError);
    expect(error.msg).toEqual(new InexistentUserIdError().message);
  });

  it("should be able to retrieve void array of flash cards if user_id provided exists but not have any flash cards", async () => {
    const { sut, userRepository } = makeSut();
    const userIdValue: string = "userid@mail.com";
    vitest.spyOn(userRepository, "findByEmail").mockReturnValue(
      Promise.resolve({
        email: "userid@mail.com",
        name: "user name",
        password: "hashed_password",
      })
    );
    const flashCards = (await sut.execute(userIdValue))
      .value as Array<FlashCardModel.Model>;
    expect(flashCards).toEqual([]);
  });

  it("should be able to retrieve flash cards if user_id provided exists", async () => {
    const { sut, userRepository, flashCardsRepository } = makeSut();
    const userIdValue: string = "userid@mail.com";
    vitest.spyOn(userRepository, "findByEmail").mockReturnValue(
      Promise.resolve({
        email: "userid@mail.com",
        name: "user name",
        password: "hashed_password",
      })
    );
    vitest.spyOn(flashCardsRepository, "findByUserId").mockReturnValue(
      Promise.resolve([
        {
          id: "id",
          awnser: "awnser",
          category: "category",
          dificulty: 1,
          question: "question",
          type: "type",
          user_id: "userid@mail.com",
        } as FlashCardModel.Model,
      ])
    );
    const flashCards = (await sut.execute(userIdValue))
      .value as Array<FlashCardModel.Model>;
    expect(flashCards).toEqual([
      {
        id: "id",
        awnser: "awnser",
        category: "category",
        dificulty: 1,
        question: "question",
        type: "type",
        user_id: "userid@mail.com",
      },
    ]);
  });
});
