export namespace UserModel {
  export type Model = {
    name: string;
    email: string;
    password: string;
    last_login: string;
  };
  export type Create = UserModel.Model;
  export type Return = Omit<UserModel.Model, "password" | "last_login"> & {
    token?: string;
  };
  export type Login = Omit<UserModel.Model, "name">;
}
