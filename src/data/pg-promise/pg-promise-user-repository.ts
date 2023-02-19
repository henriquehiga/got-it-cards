import { UserModel } from "../../domain/entities/models/user-model";
import { db } from "../../infra/pg-promise";
import { UserRepository } from "../protocols/user-repository";

enum UserRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.users(name, email, password) VALUES (${name}, ${email}, ${password});",
}

export class PgPromiseUserRepository implements UserRepository {
  async save(data: UserModel.Model): Promise<UserModel.Model> {
    try {
      await db.connect();
      await db.none(UserRepositoryQueries.SAVE, data);
      return data;
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }
}
