import { GetFlashCardsByUserId } from "../../domain/usecases/get-flash-cards-by-user-id";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class GetFlashCardsByUserIdController implements Controller {
  constructor(private readonly getFlashCardsByUserId: GetFlashCardsByUserId) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const param = request.params.userId;
    if (!param) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer um USER_ID");
    }
    const usecaseResponse = await this.getFlashCardsByUserId.execute(param);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return OK(usecaseResponse.value);
  }
}
