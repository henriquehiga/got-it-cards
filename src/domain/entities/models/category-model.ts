export namespace CategoryModel {
  export type Model = {
    id: string;
    name: string;
    description: string;
    user_id: string;
  };
  export type Create = Omit<CategoryModel.Model, "id">;
}
