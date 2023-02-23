export namespace UserModel {
  export type Model = {
    name: string;
    email: string;
    password: string;
    last_login: string;
  };
  export type Create = Omit<UserModel.Model, "last_login">;
  export type Return = Omit<UserModel.Model, "password" | "last_login"> & {
    token?: string;
  };
  export type Login = Omit<UserModel.Model, "name" | "last_login">;
}
