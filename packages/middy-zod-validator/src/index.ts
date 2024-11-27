import { ZodError, ZodSchema } from "zod";

// Overwrite keys on a target T with keys in the source S
// Useful for extending an AWS type after manipulation by middy
export type Overwrite<T, S> = Omit<T, keyof S> & S;

type Inputs = {
  eventSchema?: ZodSchema;
  responseSchema?: ZodSchema;
  contextSchema?: ZodSchema;
  envSchema?: ZodSchema;
  logger?: any;
  overwriteEvent?: boolean;
  errorResponse?: (
    statusCode: number,
    message: string,
    error?: ZodError<any>
  ) => object;
};

export const zodValidator = (opts: Inputs = {}) => {
  const errorResponse =
    opts.errorResponse ??
    ((statusCode, message, error) => {
      (opts.logger ?? console).error({
        message,
        error: JSON.stringify(error?.issues ?? error),
      });
      return {
        statusCode,
        body: JSON.stringify({ message, error: error?.issues ?? error }),
      };
    });

  return {
    before: async (input: { event: unknown; context: unknown }) => {
      const eventValidation = opts.eventSchema?.safeParse(input.event);
      if (eventValidation && !eventValidation?.success) {
        return errorResponse(
          400,
          "Event failed validation",
          eventValidation?.error
        );
      }
      if (eventValidation?.success && opts.overwriteEvent) {
        input.event = eventValidation.data;
      }
      const contextValidation = opts.contextSchema?.safeParse(input.context);
      if (contextValidation && !contextValidation?.success) {
        return errorResponse(
          400,
          "Context failed validation",
          contextValidation?.error
        );
      }
      const envValidation = opts.envSchema?.safeParse(process.env);
      if (envValidation && !envValidation?.success) {
        return errorResponse(
          400,
          "Environment failed validation",
          envValidation?.error
        );
      }
    },
    after: async (input: { response: unknown }) => {
      const responseValidation = opts.responseSchema?.safeParse(input.response);
      if (responseValidation && !responseValidation?.success) {
        return errorResponse(
          400,
          "Environment failed validation",
          responseValidation?.error
        );
      }
    },
  };
};
