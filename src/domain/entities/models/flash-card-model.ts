export namespace FlashCardModel {
  export type Model = {
    id: string;
    user_id?: string;
    question: string;
    awnser: string;
    category: string;
    dificulty: number;
    type: string;
    last_review?: string;
    created_at: string;
    updated_at: string;
  };
  export type Create = Omit<
    FlashCardModel.Model,
    "id" | "last_review" | "created_at" | "updated_at"
  >;
}
