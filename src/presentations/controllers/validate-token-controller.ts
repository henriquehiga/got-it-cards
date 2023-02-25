import { JwtToken } from "../../libs/jwt-token";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { OK, REQUEST_BODY_ERROR } from "../protocols/http-errors";

export class ValidateTokenController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const token = request.body.token;
    let tokenJsonValidate;
    if (!token) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer um TOKEN");
    }
    try {
      tokenJsonValidate = JwtToken.validate(token);
    } catch (error: any) {
      return REQUEST_BODY_ERROR("Obrigatório fornecer um TOKEN VÁLIDO");
    }
    return OK(tokenJsonValidate);
  }
}
