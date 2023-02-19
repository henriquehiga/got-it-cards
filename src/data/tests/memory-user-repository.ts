import { UserModel } from "../../domain/entities/models/user-model";
import { UserRepository } from "../protocols/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private db: UserModel.Model[] = [];

  async save(data: UserModel.Model): Promise<UserModel.Model> {
    this.db.push(data);
    return data;
  }
}
