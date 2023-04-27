import { randomInt } from "crypto";
import { Either, left } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { right } from "./../../shared/either";
import { GetFlashCardsByCategoryId } from "./get-flash-cards-by-category-id";

export class BuildDeckFlashCards {
  constructor(
    private readonly getFlashCardsByCategoryId: GetFlashCardsByCategoryId
  ) {}

  async execute(
    id: string
  ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
    const flashCards = await this.getFlashCardsByCategoryId.execute(id);
    const deckToReturn: FlashCardModel.Model[] = [];

    if (flashCards.isLeft()) {
      return left(flashCards.value);
    }

    const easyFlashCardsDeck: FlashCardModel.Model[] = [];
    const normalFlashCardsDeck: FlashCardModel.Model[] = [];
    const hardFlashCardsDeck: FlashCardModel.Model[] = [];

    flashCards.value.forEach((flashCard) => {
      if (flashCard.dificulty == 1) {
        easyFlashCardsDeck.push(flashCard);
      } else if (flashCard.dificulty === 2) {
        normalFlashCardsDeck.push(flashCard);
      } else if (flashCard.dificulty === 3) {
        hardFlashCardsDeck.push(flashCard);
      }
    });

    const minCards = 50;
    const maxCards = 100;
    const quantity =
      flashCards.value.length >= maxCards ? maxCards : flashCards.value.length;
    const easyFlashCardsMax = Math.floor(quantity * 0.2);
    const normalFlashCardsMax = Math.floor(quantity * 0.3);
    const hardFlashCardsMax = Math.floor(quantity * 0.5);

    function selectRandomCards(
      array: FlashCardModel.Model[],
      quantity: number
    ) {
      const cards = [];
      for (let i = 0; i < quantity; i++) {
        cards.push(array[randomInt(0, array.length - 1)]);
      }
      deckToReturn.push(...cards);
    }

    selectRandomCards(easyFlashCardsDeck, easyFlashCardsMax);
    selectRandomCards(normalFlashCardsDeck, normalFlashCardsMax);
    selectRandomCards(hardFlashCardsDeck, hardFlashCardsMax);
    if (deckToReturn.length < minCards) {
      const concatDeck = [
        ...easyFlashCardsDeck,
        ...normalFlashCardsDeck,
        ...hardFlashCardsDeck,
      ];
      return right(concatDeck);
    }
    return right(deckToReturn);
  }
}
