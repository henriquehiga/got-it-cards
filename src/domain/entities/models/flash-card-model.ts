export namespace FlashCardModel {
  export type Model = {
    id: string;
    user_id?: string;
    question: string;
    awnser: string;
    category: string;
    dificulty: number;
    type: string;
  };
  export type Create = Omit<FlashCardModel.Model, "id">;
}
