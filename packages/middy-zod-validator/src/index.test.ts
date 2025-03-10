import { z, ZodSchema } from "zod";
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

  it("should overwrite when the appropriate option is set", async () => {
    const input = {
      eventSchema: {
        safeParse: jest
          .fn()
          .mockReturnValue({ success: true, data: { my: "event" } }),
      } as unknown as ZodSchema,
      overwriteEvent: true,
    };
    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    await result.before(beforeInput);

    expect(input.eventSchema.safeParse).toHaveBeenCalledWith("MOCK_EVENT");
    expect(beforeInput.event).toEqual({ my: "event" });
  });

  it("should write env to context if the appropriate option is set", async () => {
    const input = {
      envSchema: z.object({
        MY_MOCK_TEST_ENV: z.string().default("MOCK"),
      }),
      setEnvToContext: true,
    };
    const result = zodValidator(input);

    const beforeInput: { event: any; context: any } = {
      event: "MOCK_EVENT",
      context: {},
    };
    await result.before(beforeInput);

    expect(beforeInput.context.env).toEqual({ MY_MOCK_TEST_ENV: "MOCK" });
  });

  it("should write env to context if the appropriate option is set with context null", async () => {
    const input = {
      envSchema: z.object({
        MY_MOCK_TEST_ENV: z.string().default("MOCK"),
      }),
      setEnvToContext: true,
    };
    const result = zodValidator(input);

    const beforeInput: { event: any; context: any } = {
      event: "MOCK_EVENT",
      context: null,
    };
    await result.before(beforeInput);

    expect(beforeInput.context.env).toEqual({ MY_MOCK_TEST_ENV: "MOCK" });
  });

  it("should not overwrite other context values when setEnvToContext is set", async () => {
    const input = {
      envSchema: z.object({
        MY_MOCK_TEST_ENV: z.string().default("MOCK"),
      }),
      setEnvToContext: true,
    };
    const result = zodValidator(input);
    const mockContext = { other: "values", env: { additional: "envs" } };
    const beforeInput: { event: any; context: any } = {
      event: "MOCK_EVENT",
      context: mockContext,
    };
    await result.before(beforeInput);

    expect(beforeInput.context).toEqual({
      ...mockContext,
      env: { ...mockContext.env, MY_MOCK_TEST_ENV: "MOCK" },
    });
  });

  it("should call errorResponse if contextValidation fails", async () => {
    const input = {
      contextSchema: {
        safeParse: jest
          .fn()
          .mockReturnValue({ success: false, error: "Invalid" }),
      } as unknown as ZodSchema,
      logger: {
        error: jest.fn(),
      },
    };

    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    const res = await result.before(beforeInput);
    expect(input.logger.error).toHaveBeenCalled();
    expect(res).toStrictEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: "Context failed validation",
        error: "Invalid",
      }),
    });
  });

  it("should call errorResponse provided if validation fails", async () => {
    const input = {
      contextSchema: {
        safeParse: jest
          .fn()
          .mockReturnValue({ success: false, error: "Invalid" }),
      } as unknown as ZodSchema,
      logger: {
        error: jest.fn(),
      },
      errorResponse: jest.fn(),
    };

    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    await result.before(beforeInput);
    expect(input.logger.error).toHaveBeenCalledTimes(0);
    expect(input.errorResponse).toHaveBeenCalledWith(
      400,
      "Context failed validation",
      "Invalid"
    );
  });

  it("should call errorResponse if envValidation fails", async () => {
    const input = {
      envSchema: {
        safeParse: jest
          .fn()
          .mockReturnValue({ success: false, error: "Invalid" }),
      } as unknown as ZodSchema,
      logger: {
        error: jest.fn(),
      },
    };

    const result = zodValidator(input);

    const beforeInput = { event: "MOCK_EVENT", context: "MOCK_CONTEXT" };
    const res = await result.before(beforeInput);
    expect(input.logger.error).toHaveBeenCalled();
    expect(res).toStrictEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: "Environment failed validation",
        error: "Invalid",
      }),
    });
  });

  it("should call errorResponse if responseValidation fails", async () => {
    const input = {
      responseSchema: {
        safeParse: jest
          .fn()
          .mockReturnValue({ success: false, error: "Invalid" }),
      } as unknown as ZodSchema,
      logger: {
        error: jest.fn(),
      },
    };

    const result = zodValidator(input);

    const afterInput = { response: "MOCK_RESPONSE" };
    const res = await result.after(afterInput);
    expect(input.logger.error).toHaveBeenCalled();
    expect(res).toStrictEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: "Environment failed validation",
        error: "Invalid",
      }),
    });
  });
});
