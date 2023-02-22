import { JwtToken } from "../../libs/jwt-token";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class ValidateTokenController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const token = request.body.token;
    if (!token) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer um TOKEN");
    }
    const tokenJsonValidate = JwtToken.validate(token);
    return OK(tokenJsonValidate);
  }
}
