import { GetFlashCardsByCategory } from "../../domain/usecases/get-flash-cards-by-category";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, UNEXPECTED_SERVER_ERROR } from "../protocols/http-errors";

export class GetFlashCardsByCategoryController {
  constructor(
    private readonly getFlashCardsByCategory: GetFlashCardsByCategory
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { category } = request.params;
      const flashCards = await this.getFlashCardsByCategory.execute(category);
      return OK(flashCards.value);
    } catch (err) {
      return UNEXPECTED_SERVER_ERROR(err);
    }
  }
}
