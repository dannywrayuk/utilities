import { safe } from "./safe";

const mockReturnValue = "MOCK_RETURN";
const mockErrorString = "MOCK_ERROR";
const mockError = new Error(mockErrorString);

it("Should call the supplied function with supplied args", () => {
  const mockArgs = [1, 2, 3];
  const mockFunction = jest.fn(() => mockReturnValue);
  const returnValue = safe(mockFunction)(...mockArgs);
  expect(returnValue).toEqual(mockReturnValue);
  expect(mockFunction).toHaveBeenCalledWith(...mockArgs);
});

it("Should return null when supplied function errors", () => {
  const mockArgs = [1, 2, 3];
  const mockFunction = jest.fn(() => {
    throw new Error("MOCK_ERROR");
  });
  const returnValue = safe(mockFunction)(...mockArgs);
  expect(returnValue).toEqual(null);
  expect(mockFunction).toHaveBeenCalledWith(...mockArgs);
});

it("Should return on error when supplied function errors", () => {
  const mockArgs = [1, 2, 3];
  const mockFunction = jest.fn(() => {
    throw mockError;
  });
  const mockOnError = jest.fn(() => {
    return mockReturnValue;
  });
  const returnValue = safe(mockFunction, mockOnError)(...mockArgs);
  expect(returnValue).toEqual(mockReturnValue);
  expect(mockFunction).toHaveBeenCalledWith(...mockArgs);
  expect(mockOnError).toHaveBeenCalledWith(mockError);
});

it("Should throw error string when supplied function errors", () => {
  const mockArgs = [1, 2, 3];
  const mockFunction = jest.fn(() => {
    throw mockError;
  });
  expect(() => safe(mockFunction, mockErrorString)(...mockArgs)).toThrow(
    mockError
  );
  expect(mockFunction).toHaveBeenCalledWith(...mockArgs);
});
