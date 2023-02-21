import { PersistNewFlashCard } from "../../domain/usecases/persist-new-flash-card";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CREATED, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class PersistNewFlashCardController implements Controller {
  constructor(private readonly persistNewFlashCard: PersistNewFlashCard) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.persistNewFlashCard.execute(
      request.body
    );
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return CREATED(usecaseResponse.value);
  }
}
