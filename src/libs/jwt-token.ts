import { ENV_ENCRYPT_KEY } from "./../main/configs/setup-env";
import { sign, verify } from "jsonwebtoken";

export class JwtToken {
  static get(data: object) {
    const token = sign(data, ENV_ENCRYPT_KEY, {
      expiresIn: "1 day",
    });
    return token;
  }

  static validate(data: string) {
    const valid = verify(data, ENV_ENCRYPT_KEY);
    return valid;
  }
}
