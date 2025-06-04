import { cbc } from "@noble/ciphers/aes";
import { hmac } from "@noble/hashes/hmac";
import { sha512 } from "@noble/hashes/sha512";
import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/ciphers/utils";
import { envConfig } from "@push-manager/shared";

export const base64ToBytes = (base64: string): Uint8Array => {
  return new Uint8Array(Buffer.from(base64, "base64"));
};
export const bytesToBase64 = (bytes: Uint8Array): string => {
  return Buffer.from(bytes).toString("base64");
};
export const utf8ToBase64 = (utf8: string): string => {
  return Buffer.from(utf8).toString("base64");
};
export const base64ToUtf8 = (base64: string): string => {
  return Buffer.from(base64, "base64").toString("utf8");
};
export const bytesToUtf8 = (bytes: Uint8Array): string => {
  return Buffer.from(bytes).toString("utf8");
};
const jwtSecret = envConfig.server.jwt.hs256;
export const aes = () =>
  cbc(hexToBytes(`${jwtSecret}${jwtSecret}`), hexToBytes(`${jwtSecret}`));

export function encryptFields(
  data: any,
  fields: string[],
  isArray: boolean = false
) {
  if (!data) return data;

  // 배열인 경우
  if (isArray && Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === "string") {
        return bytesToBase64(aes().encrypt(utf8ToBytes(item)));
      }
      return item;
    });
  }

  // 객체인 경우
  const encryptedData = { ...data };
  fields.forEach((field) => {
    if (encryptedData[field]) {
      encryptedData[field] = bytesToBase64(
        aes().encrypt(utf8ToBytes(encryptedData[field]))
      );
    }
  });
  return encryptedData;
}

export const passwordCompare = async (
  salt: string,
  inputPassword: string,
  originPassword: string
): Promise<boolean> => {
  return (
    bytesToHex(hmac(sha512, hexToBytes(salt), inputPassword)) === originPassword
  );
};
