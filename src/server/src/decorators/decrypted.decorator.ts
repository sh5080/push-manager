import { bytesToUtf8 } from "@noble/ciphers/utils";
import { aes, base64ToBytes } from "../utils/crypto.util";

export function Decrypted(
  encryptedFields: string[] = ["memNo", "unifyId", "ci"]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (!result) return result;

      // 단일 객체인 경우
      if (!Array.isArray(result)) {
        encryptedFields.forEach((field) => {
          if (result[field]) {
            result[field] = bytesToUtf8(
              aes().decrypt(base64ToBytes(result[field]))
            );
          }
        });
        return result;
      }

      // 배열인 경우
      return result.map((item) => {
        encryptedFields.forEach((field) => {
          if (item[field]) {
            item[field] = bytesToUtf8(
              aes().decrypt(base64ToBytes(item[field]))
            );
          }
        });
        return item;
      });
    };
    return descriptor;
  };
}
