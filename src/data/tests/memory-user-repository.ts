import { UserModel } from "../../domain/entities/models/user-model";
import { UserRepository } from "../protocols/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private db: UserModel.Model[] = [];

  async findByEmail(data: string): Promise<UserModel.Model | null> {
    const founded = this.db.find((user) => user.email === data);
    if (!founded) {
      return null;
    }
    return founded;
  }

  async save(data: UserModel.Model): Promise<UserModel.Model> {
    this.db.push(data);
    return data;
  }
}
