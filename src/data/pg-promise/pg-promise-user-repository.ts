import { UserModel } from "../../domain/entities/models/user-model";
import { db } from "../../infra/pg-promise";
import { UserRepository } from "../protocols/user-repository";

enum UserRepositoryQueries {
  SAVE = "INSERT INTO gotitcards.users(name, email, password) VALUES (${name}, ${email}, ${password});",
  FIND_BY_EMAIL = "SELECT TOP 1 FROM gotitcards.users WHERE email = $email",
}

export class PgPromiseUserRepository implements UserRepository {
  async findByEmail(data: string): Promise<UserModel.Model | null> {
    try {
      await db.connect();
      const founded = await db.one<UserModel.Model>(
        UserRepositoryQueries.FIND_BY_EMAIL,
        data
      );
      return founded;
    } catch (error: any) {
      throw new Error(error.toString());
    }
  }

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
