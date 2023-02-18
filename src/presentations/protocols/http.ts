export type HttpRequest = {
  body: any;
  param: Record<string, any>;
};

export type HttpResponse = {
  body: any;
  statusCode: number;
};
