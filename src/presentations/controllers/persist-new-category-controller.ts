import { PersistNewCategory } from "../../domain/usecases/persist-new-category";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CREATED, OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class PersistNewCategoryController implements Controller {
  constructor(private readonly usecase: PersistNewCategory) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.usecase.execute(request.body);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return CREATED(usecaseResponse.value);
  }
}
