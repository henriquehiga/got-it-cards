import { UserModel } from "../../domain/entities/models/user-model";

export interface UserRepository {
  save(data: UserModel.Model): Promise<UserModel.Model>;
}