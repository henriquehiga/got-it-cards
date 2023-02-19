export namespace UserModel {
  export type Model = {
    name: string;
    email: string;
    password: string;
  };
  export type Create = UserModel.Model;
  export type Return = Omit<UserModel.Model, "password">;
}
