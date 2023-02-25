import { UpdateFlashCardInfo } from "../../domain/usecases/update-flash-card-info";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { REQUEST_BODY_ERROR } from "../protocols/http-errors";
import { OK } from "./../protocols/http-errors";

export class UpdateFlashCardController implements Controller {
  constructor(private readonly usecase: UpdateFlashCardInfo) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.usecase.execute(request.body);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return OK(usecaseResponse.value);
  }
}
