import { RegisterUser } from "../../domain/usecases/register-user";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CREATED, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class RegisterUserController implements Controller {
  constructor(private readonly usecase: RegisterUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.usecase.execute(request.body);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return CREATED(usecaseResponse.value);
  }
}
