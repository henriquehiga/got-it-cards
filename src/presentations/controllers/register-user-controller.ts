import { RegisterUser } from "../../domain/usecases/register-user";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class RegisterUserController implements Controller {
  constructor(private readonly registerUserUsecase: RegisterUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.registerUserUsecase.execute(
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
