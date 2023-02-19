import { PersistNewFlashCard } from "../../domain/usecases/persist-new-flash-card";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class PersistNewFlashCardController implements Controller {
  constructor(private readonly persistNewFlashCard: PersistNewFlashCard) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.persistNewFlashCard.execute(
      request.body
    );
    if (usecaseResponse.isLeft()) {
      return {
        body: usecaseResponse.value.msg,
        statusCode: 400,
      };
    }
    return {
      body: usecaseResponse.value,
      statusCode: 201,
    };
  }
}
