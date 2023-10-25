import { ZodSchema } from "zod";
import { validate } from "./validate";

// Overwrite keys on a target T with keys in the source S
// Useful for extending an AWS type after manipulation by middy
export type Overwrite<T, S> = Omit<T, keyof S> & S;

type Inputs = {
  eventSchema?: ZodSchema;
  responseSchema?: ZodSchema;
  contextSchema?: ZodSchema;
  envSchema?: ZodSchema;
};

export const zodValidator = (opts: Inputs = {}) => ({
  before: async (input: { event: unknown; context: unknown }) => {
    validate(
      input.event,
      opts.eventSchema,
      "Event object failed validation",
      400
    );
    validate(
      input.context,
      opts.contextSchema,
      "Context object failed validation",
      500
    );
    validate(
      process.env,
      opts.envSchema,
      "Environment object failed validation",
      500
    );
  },
  after: async (input: { response: unknown }) =>
    validate(
      input.response,
      opts.responseSchema,
      "Response object failed validation",
      500
    ),
});
