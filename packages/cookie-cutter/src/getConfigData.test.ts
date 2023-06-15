import fs from "node:fs";
import { getConfigData } from "./getConfigData";

let mockReadFileSync = jest.spyOn(fs, "readFileSync");
const mockConfigPath = "MOCK_CONFIG_PATH";

beforeEach(() => {
  jest.clearAllMocks();
});

it("should return the config data as json", () => {
  const mockConfig = { MOCK: "DATA" };
  const mockFileData = JSON.stringify({ MOCK: "DATA" });

  mockReadFileSync.mockReturnValueOnce(mockFileData);

  const config = getConfigData(mockConfigPath);
  expect(config).toEqual(mockConfig);
});

it("should throw error when can't read file", () => {
  mockReadFileSync.mockImplementationOnce(() => {
    throw new Error("MOCK_READ_ERROR");
  });

  expect(() => getConfigData(mockConfigPath)).toThrow();
});

it("should throw error when can't parse JSON", () => {
  const mockFileData = "notJson";

  mockReadFileSync.mockReturnValueOnce(mockFileData);

  expect(() => getConfigData(mockConfigPath)).toThrow();
});
