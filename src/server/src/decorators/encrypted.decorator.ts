import { encryptFields } from "../utils/crypto.util";

export function Encrypted(
  encryptedFields: string[] = ["memNo", "unifyId", "ci"]
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const options = args[0];
      const encryptedOptions = encryptFields(options, encryptedFields);
      return originalMethod.apply(this, [encryptedOptions]);
    };
    return descriptor;
  };
}
