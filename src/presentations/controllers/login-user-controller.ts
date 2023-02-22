import { LoginUser } from "../../domain/usecases/login-user";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class LoginUserController implements Controller {
  constructor(private readonly usecase: LoginUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.usecase.execute(request.body);
    if (usecaseResponse.isLeft()) {
      return REQUEST_BODY_ERROR(usecaseResponse.value.msg);
    }
    return OK(usecaseResponse.value);
  }
}
