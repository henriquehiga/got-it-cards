import { randomUUID } from "crypto";

export class IdGenerator {
  static get(): string {
    return randomUUID();
  }
}
