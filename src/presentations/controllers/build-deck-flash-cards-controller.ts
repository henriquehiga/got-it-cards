import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";
import { BuildDeckFlashCards } from "./../../domain/usecases/build-deck-flash-cards";
import { Controller } from "./../protocols/controller";

export class BuildDeckFlashCardsController implements Controller {
  constructor(private readonly usecase: BuildDeckFlashCards) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const param = request.params.category;
    if (!param) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer uma CATEGORY");
    }
    const usecaseResponse = await this.usecase.execute(param);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return OK(usecaseResponse.value);
  }
}
