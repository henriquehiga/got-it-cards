import { Request, NextFunction, Response } from "express";
import { JwtToken } from "../../libs/jwt-token";
import { UNAUTHORIZED_ERROR } from "../../presentations/protocols/http-errors";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { authorization } = req.headers;
  const { path } = req;

  if (path.includes("/login-user") || path.includes("/register-user")) {
    return next();
  }

  if (!authorization) {
    return res
      .status(UNAUTHORIZED_ERROR().statusCode)
      .json(UNAUTHORIZED_ERROR());
  }

  try {
    const valid = await JwtToken.validate(authorization);
    if (!valid) {
      return res
        .status(UNAUTHORIZED_ERROR().statusCode)
        .json(UNAUTHORIZED_ERROR());
    }
    return next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR().statusCode)
      .json(UNAUTHORIZED_ERROR());
  }
};
