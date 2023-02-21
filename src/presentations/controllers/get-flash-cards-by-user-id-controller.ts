import { GetFlashCardsByUserId } from "../../domain/usecases/get-flash-cards-by-user-id";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class GetFlashCardsByUserIdController implements Controller {
  constructor(private readonly getFlashCardsByUserId: GetFlashCardsByUserId) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const param = request.params.userId;
    if (!param) {
      return {
        body: "Obrigatório fornecer um USER_ID",
        statusCode: 400,
      };
    }
    const usecaseResponse = await this.getFlashCardsByUserId.execute(param);
    if (usecaseResponse.isLeft()) {
      return {
        body: usecaseResponse.value.msg,
        statusCode: 400,
      };
    }
    return {
      body: usecaseResponse.value,
      statusCode: 200,
    };
  }
}
