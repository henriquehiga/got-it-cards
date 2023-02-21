export const UNAUTHORIZED_ERROR = () => {
  return {
    body: "Por favor, autentique-se novamente.",
    statusCode: 401,
  };
};

export const OK = (data: any) => {
  return {
    body: data,
    statusCode: 200,
  };
};

export const CREATED = (data: any) => {
  return {
    body: data,
    statusCode: 201,
  };
};

export const UNEXPECTED_SERVER_ERROR = (data: any) => {
  return {
    body: data,
    statusCode: 500,
  };
};

export const REQUEST_BODY_ERROR = (data: any) => {
  return {
    body: data,
    statusCode: 400,
  };
};
