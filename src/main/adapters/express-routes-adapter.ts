import { Request, Response } from "express";
import { Controller } from "../../presentations/protocols/controller";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req);
    res.status(httpResponse.statusCode).json(httpResponse);
  };
};