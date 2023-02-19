export namespace UserModel {
  export type Model = {
    name: string;
    email: string;
    password: string;
  };
  export type Create = UserModel.Model;
}
