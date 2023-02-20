import { LoginUser } from "../../domain/usecases/login-user";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoginUserController implements Controller {
  constructor(private readonly loginRepo: LoginUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.loginRepo.execute(request.body);
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
