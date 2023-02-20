import { PgPromiseUserRepository } from "../../data/pg-promise/pg-promise-user-repository";
import { LoginUser } from "../../domain/usecases/login-user";
import { LoginUserController } from "../../presentations/controllers/login-user-controller";
import { Controller } from "../../presentations/protocols/controller";

export const makeLoginUserController = (): Controller => {
  const repository = new PgPromiseUserRepository();
  const usecase = new LoginUser(repository);
  const controller = new LoginUserController(usecase);
  return controller;
};
