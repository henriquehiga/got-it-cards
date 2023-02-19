export namespace UserModel {
  export type Model = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  export type Create = Omit<UserModel.Model, "id">;
}
