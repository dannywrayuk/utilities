import { ZodSchema } from "zod";
import { zodValidator } from ".";
import { validate } from "./validate";

jest.mock("./validate", () => ({
  validate: jest.fn(),
}));

const MOCK_EVENT = "MOCK_EVENT";
const MOCK_EVENT_SCHEMA = "MOCK_EVENT_SCHEMA";

const MOCK_CONTEXT = "MOCK_CONTEXT";
const MOCK_CONTEXT_SCHEMA = "MOCK_CONTEXT_SCHEMA";

const MOCK_ENV = "MOCK_ENV";
const MOCK_ENV_SCHEMA = "MOCK_ENV_SCHEMA";

const MOCK_RESPONSE = "MOCK_RESPONSE";
const MOCK_RESPONSE_SCHEMA = "MOCK_RESPONSE_SCHEMA";

process.env = MOCK_ENV as any;

describe("When the zodValidator is called", () => {
  it("should call validate with schemas", async () => {
    const result = zodValidator({
      eventSchema: MOCK_EVENT_SCHEMA as unknown as ZodSchema,
      contextSchema: MOCK_CONTEXT_SCHEMA as unknown as ZodSchema,
      responseSchema: MOCK_RESPONSE_SCHEMA as unknown as ZodSchema,
      envSchema: MOCK_ENV_SCHEMA as unknown as ZodSchema,
    });

    const beforeInput = { event: MOCK_EVENT, context: MOCK_CONTEXT };
    await result.before(beforeInput);

    expect(validate).toHaveBeenCalledWith(
      MOCK_EVENT,
      MOCK_EVENT_SCHEMA,
      "Event object failed validation",
      400
    );

    expect(validate).toHaveBeenCalledWith(
      MOCK_CONTEXT,
      MOCK_CONTEXT_SCHEMA,
      "Context object failed validation",
      500
    );

    expect(validate).toHaveBeenCalledWith(
      MOCK_ENV,
      MOCK_ENV_SCHEMA,
      "Environment object failed validation",
      500
    );

    const afterInput = { response: MOCK_RESPONSE };
    await result.after(afterInput);

    expect(validate).toHaveBeenCalledWith(
      MOCK_RESPONSE,
      MOCK_RESPONSE_SCHEMA,
      "Response object failed validation",
      500
    );
  });
});
