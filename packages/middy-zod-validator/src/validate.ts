import { createError } from "@middy/util";
import { ZodSchema } from "zod";

export const validate = async (
  value: unknown,
  schema: ZodSchema | undefined,
  errorMessage: string,
  statusCode: number
) => {
  if (schema) {
    const validation = await schema.safeParseAsync(value);
    if (!validation.success) {
      throw createError(
        statusCode,
        `${errorMessage}\n${JSON.stringify(validation.error, null, 2)}`
      );
    }
  }
};
