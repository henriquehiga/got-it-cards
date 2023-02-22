import { GetCategoriesByUserId } from "../../domain/usecases/get-categories-by-user-id";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";
import { Controller } from "../protocols/controller";

export class GetCategoriesByUserIdController implements Controller {
  constructor(private readonly usecase: GetCategoriesByUserId) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const param = request.params.userId;
    if (!param) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer um USER_ID");
    }
    const usecaseResponse = await this.usecase.execute(param);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return OK(usecaseResponse.value);
  }
}
