export interface CryptoProtocol {
  decrypt(data: string): string;
  compareHash(data: string, hash: string): boolean;
}
