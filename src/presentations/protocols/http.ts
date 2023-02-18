export type HttpRequest = {
  body: any;
  param:
    | {
        ["key"]: string;
      }[]
    | null;
};

export type HttpResponse = {
  body: any;
  statusCode: number;
};
