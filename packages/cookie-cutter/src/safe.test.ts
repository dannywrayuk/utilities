import { safe } from "./safe";

it("Should call the supplied function with supplied args", () => {
  const mockReturnValue = "MOCK_RETURN";
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
