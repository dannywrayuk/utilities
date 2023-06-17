import fs from "fs";
import { getDestination } from "./getDestination";

const mockDestinationArg = "MOCK_DESTINATION_ARG";

const mockLStat = jest.fn();
jest.spyOn(fs, "lstatSync").mockImplementation(mockLStat);

const mockMkDir = jest.fn();
jest.spyOn(fs, "mkdirSync").mockImplementation(mockMkDir);

beforeEach(() => {
  jest.clearAllMocks();
  mockLStat.mockReset();
  mockMkDir.mockReset();
});

it("should return the destination if the directory exists", () => {
  mockLStat.mockImplementationOnce(() => ({ isDirectory: () => true }));
  const destination = getDestination(mockDestinationArg, {});

  expect(mockLStat).toHaveBeenCalledWith(mockDestinationArg);
  expect(destination).toEqual({ directory: mockDestinationArg });
});

it("should mkdir if the input is an appname", () => {
  mockLStat.mockImplementationOnce(() => ({ isDirectory: () => false }));
  const destination = getDestination(mockDestinationArg, {});

  expect(mockLStat).toHaveBeenCalledWith(mockDestinationArg);
  expect(mockMkDir).toHaveBeenCalledWith(mockDestinationArg);
  expect(destination).toEqual({ directory: mockDestinationArg });
});

it("should throw if destination doesn't exist and not a valid app name", () => {
  expect(() => getDestination("£", {})).toThrow();
});
