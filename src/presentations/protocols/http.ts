export type HttpRequest = {
  body: any;
  params: Record<string, any>;
};

export type HttpResponse = {
  body: any;
  statusCode: number;
};
