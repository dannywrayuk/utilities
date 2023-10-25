import { createError } from "@middy/util";
import { ZodSchema } from "zod";
import { validate } from "./validate";

const MOCK_VALUE = { key: "value" };
const MOCK_SCHEMA = { safeParseAsync: jest.fn() };
const MOCK_ERROR = "MOCK_ERROR";
const MOCK_STATUS = 123;

jest.mock("@middy/util", () => ({
  createError: jest.fn(),
}));

describe("When validate is called", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should skip is no schema", async () => {
    await validate(MOCK_VALUE, undefined, MOCK_ERROR, MOCK_STATUS);
  });
  it("should parse the schema", async () => {
    MOCK_SCHEMA.safeParseAsync.mockReturnValue({ success: true });
    await validate(
      MOCK_VALUE,
      MOCK_SCHEMA as unknown as ZodSchema,
      MOCK_ERROR,
      MOCK_STATUS
    );
    expect(MOCK_SCHEMA.safeParseAsync).toHaveBeenCalledWith(MOCK_VALUE);
    expect(createError).toHaveBeenCalledTimes(0);
  });
  it("should throw an error if validation fails", async () => {
    MOCK_SCHEMA.safeParseAsync.mockReturnValue({ success: false });
    (createError as jest.Mock).mockReturnValue(new Error(MOCK_ERROR));
    await expect(() =>
      validate(
        MOCK_VALUE,
        MOCK_SCHEMA as unknown as ZodSchema,
        MOCK_ERROR,
        MOCK_STATUS
      )
    ).rejects.toThrowError(MOCK_ERROR);

    expect(MOCK_SCHEMA.safeParseAsync).toHaveBeenCalledWith(MOCK_VALUE);
    expect(createError).toHaveBeenCalledWith(
      MOCK_STATUS,
      MOCK_ERROR + "\nundefined"
    );
  });
});
