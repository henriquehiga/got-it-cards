import { GetFlashCardsByUserId } from "../../domain/usecases/get-flash-cards-by-user-id";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class GetFlashCardsByUserIdController implements Controller {
  constructor(private readonly getFlashCardsByUserId: GetFlashCardsByUserId) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const usecaseResponse = await this.getFlashCardsByUserId.execute(
      request.body.user_id
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
