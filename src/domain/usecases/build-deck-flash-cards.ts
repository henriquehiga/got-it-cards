import { Either, left } from "../../shared/either";
import { ErrorResponse } from "../../shared/error-response";
import { FlashCardModel } from "../entities/models/flash-card-model";
import { right } from "./../../shared/either";
import { GetFlashCardsByCategory } from "./get-flash-cards-by-category";
export class BuildDeckFlashCards {
  constructor(
    private readonly getFlashCardsByCategory: GetFlashCardsByCategory
  ) {}

  async execute(
    category: string
  ): Promise<Either<ErrorResponse, FlashCardModel.Model[]>> {
    const flashCards = await this.getFlashCardsByCategory.execute(category);
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

    const minCards = 6;
    const maxCards = 10;

    const easyFlashCardsMax = Math.floor(flashCards.value.length * 0.2);
    const normalFlashCardsMax = Math.floor(flashCards.value.length * 0.3);
    const hardFlashCardsMax = Math.floor(flashCards.value.length * 0.5);

    function selectCards(array: FlashCardModel.Model[], quantity: number) {
      const cards = [];
      for (let i = 0; i < quantity; i++) {
        cards.push(array[i]);
      }
      deckToReturn.push(...cards);
    }

    selectCards(easyFlashCardsDeck, easyFlashCardsMax);
    selectCards(normalFlashCardsDeck, normalFlashCardsMax);
    selectCards(hardFlashCardsDeck, hardFlashCardsMax);

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
