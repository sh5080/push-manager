import { plainToInstance, ClassConstructor } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { BadRequestException } from "../types/error.type";

export async function validateDto<T extends object>(
  dto: ClassConstructor<T>,
  data: object
): Promise<T> {
  const dtoInstance = plainToInstance(dto, data);

  try {
    await validateOrReject(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    return dtoInstance;
  } catch (errors) {
    const messages = (errors as ValidationError[])
      .map((error) => Object.values(error.constraints || {}))
      .flat();

    throw new BadRequestException(messages.join(", "));
  }
}
