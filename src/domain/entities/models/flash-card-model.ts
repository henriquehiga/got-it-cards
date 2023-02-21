export namespace FlashCardModel {
  export type Model = {
    id: string;
    user_id?: string;
    question: string;
    awnser: string;
    category: string;
    dificulty: number;
    type: string;
    created_at: string;
    updated_at: string;
  };
  export type Create = Omit<FlashCardModel.Model, "id">;
}
