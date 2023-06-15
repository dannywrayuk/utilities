import fs from "node:fs";
import { getDestination } from "./getDestination";

const mockMkDir = jest.fn();
jest.spyOn(fs, "mkdirSync").mockImplementation(mockMkDir);
const mockLStat = jest.fn();
jest.spyOn(fs, "lstatSync").mockImplementation(mockLStat);

beforeEach(() => {
  jest.clearAllMocks();
});

it("should throw if destination is undefined", () => {
  expect(() => getDestination(undefined, {})).toThrow();
});

it("should return the destination if the directory exists", () => {
  const mockDestinationArg = "MOCK_DESTINATION_ARG";
  mockLStat.mockImplementationOnce(() => ({ isDirectory: () => true }));
  const destination = getDestination(mockDestinationArg, {});

  expect(mockLStat).toHaveBeenCalledWith(mockDestinationArg);
  expect(destination).toEqual(mockDestinationArg);
});

it("should return the destination if the directory exists", () => {
  const mockDestinationArg = "MOCK_DESTINATION_ARG";
  mockLStat.mockImplementationOnce(() => ({ isDirectory: () => false }));
  const destination = getDestination(mockDestinationArg, {});

  expect(mockLStat).toHaveBeenCalledWith(mockDestinationArg);
  expect(mockMkDir).toHaveBeenCalledWith(mockDestinationArg);
  expect(destination).toEqual(mockDestinationArg);
});

it("should throw if destination doesn't exist and not a valid app name", () => {
  const mockDestinationArg = "£";
  expect(() => getDestination(mockDestinationArg, {})).toThrow();
});
