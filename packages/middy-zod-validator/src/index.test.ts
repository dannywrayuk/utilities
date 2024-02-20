import { ZodSchema } from "zod";
import { zodValidator } from ".";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("When the zodValidator is called", () => {
  it("should check input against each validator", async () => {
    const input = {
      eventSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
      contextSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
      responseSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
      envSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
    };
    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    await result.before(beforeInput);

    expect(input.eventSchema.safeParse).toHaveBeenCalledWith(beforeInput.event);
    expect(input.contextSchema.safeParse).toHaveBeenCalledWith(
      beforeInput.context
    );
    expect(input.envSchema.safeParse).toHaveBeenCalledWith(process.env);

    const afterInput = { response: "MOCK_RESPONSE" };
    await result.after(afterInput);
    expect(input.responseSchema.safeParse).toHaveBeenCalledWith(
      afterInput.response
    );
  });

  it("should return on unsuccessful validation", async () => {
    const input = {
      eventSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
      contextSchema: { safeParse: jest.fn() } as unknown as ZodSchema,
      logger: { error: jest.fn() },
    };
    (input.eventSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: false,
      error: "MOCK_ERROR",
    });
    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    const errorResponse = await result.before(beforeInput);

    expect(input.eventSchema.safeParse).toHaveBeenCalledWith(beforeInput.event);
    expect(input.contextSchema.safeParse).not.toHaveBeenCalled();
    const error = {
      message: "Event failed validation",
      error: "MOCK_ERROR",
    };
    expect(input.logger.error).toHaveBeenCalledWith({
      message: error.message,
      error: JSON.stringify(error.error),
    });
    expect(errorResponse).toEqual({
      statusCode: 400,
      body: JSON.stringify(error),
    });
  });
});
