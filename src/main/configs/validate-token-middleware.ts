import { Request, NextFunction, Response } from "express";
import { JwtToken } from "../../libs/jwt-token";

export default (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers["authorization"];
  const path = req.path;
  if (path.includes("/login-user") || path.includes("/register-user")) {
    next();
    return;
  }
  if (!authorization) {
    res.status(401).json({
      body: "Please authenticate",
      statusCode: 401,
    });
    return;
  }
  try {
    const valid = JwtToken.validate(authorization);
    if (!valid) {
      res.status(401).json({
        body: "Please authenticate",
        statusCode: 401,
      });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({
      body: "Please authenticate",
      statusCode: 401,
    });
    return;
  }
};
