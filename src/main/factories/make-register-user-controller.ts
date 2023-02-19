import { PgPromiseUserRepository } from "../../data/pg-promise/pg-promise-user-repository";
import { RegisterUser } from "../../domain/usecases/register-user";
import { RegisterUserController } from "../../presentations/controllers/register-user-controller";
import { Controller } from "../../presentations/protocols/controller";

export const makeRegisterUserController = (): Controller => {
  const repository = new PgPromiseUserRepository();
  const usecase = new RegisterUser(repository);
  const controller = new RegisterUserController(usecase);
  return controller;
};
