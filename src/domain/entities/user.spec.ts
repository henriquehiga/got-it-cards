import { User } from "./user";
import { describe, expect, it } from "vitest";
import { UserModel } from "./models/user-model";
import { ErrorResponse } from "../../shared/error-response";
import { MissingFieldError } from "./errors/missing-field-error";

describe("User Entity", () => {
  it("should return a user if correct data is provided", () => {
    const data: UserModel.Model = {
      id: "valid-id",
      email: "valid@mail.com",
      name: "valid name",
      password: "valid_hashed_password",
    };
    const user = User.create(data).value as User;
    expect(user).toBeInstanceOf(User);
    expect(user.props).toEqual(data);
    expect(user.props.id).toBe("valid-id");
  });

  it("should return an MissingFieldError if ID is not provided", () => {
    const data: UserModel.Model = {
      id: "",
      email: "valid@mail.com",
      name: "valid name",
      password: "valid_hashed_password",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("id"));
    expect(error.msg).toEqual(new MissingFieldError("id").message);
  });

  it("should return an MissingFieldError if EMAIL is not provided", () => {
    const data: UserModel.Model = {
      id: "valid-id",
      email: "",
      name: "valid name",
      password: "valid_hashed_password",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("email"));
    expect(error.msg).toEqual(new MissingFieldError("email").message);
  });

  it("should return an MissingFieldError if NAME is not provided", () => {
    const data: UserModel.Model = {
      id: "valid-id",
      email: "valid@mail.com",
      name: "",
      password: "valid_hashed_password",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("name"));
    expect(error.msg).toEqual(new MissingFieldError("name").message);
  });

  it("should return an MissingFieldError if PASSWORD is not provided", () => {
    const data: UserModel.Model = {
      id: "valid-id",
      email: "valid@mail.com",
      name: "valid name",
      password: "",
    };
    const error = User.create(data).value as ErrorResponse;
    expect(error.error).toEqual(new MissingFieldError("password"));
    expect(error.msg).toEqual(new MissingFieldError("password").message);
  });
});
