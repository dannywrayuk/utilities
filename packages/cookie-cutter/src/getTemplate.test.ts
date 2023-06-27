import fs from "fs";
import path from "path";
import { getTemplate } from "./getTemplate";

const mockTemplatePath = "MOCK_TEMPLATE_PATH";
const mockDirectory = "MOCK_DIRECTORY";
const mockDataObject = { MOCK: "DATA" };
const mockIsDirectory = {
  isDirectory: () => true,
};
const mockNotDirectory = { isDirectory: () => false };

const mockLStat = jest.fn();
jest.spyOn(fs, "lstatSync").mockImplementation(mockLStat);

const mockReadDirSync = jest.fn();
jest.spyOn(fs, "readdirSync").mockImplementation(mockReadDirSync);

beforeEach(() => {
  jest.clearAllMocks();
  mockLStat.mockReset();
  mockReadDirSync.mockReset();
});

it("should return template path if path supplied is valid", () => {
  mockLStat
    .mockReturnValueOnce(mockIsDirectory)
    .mockReturnValueOnce(mockDataObject);

  const template = getTemplate(mockTemplatePath);

  expect(template).toEqual({
    directory: mockTemplatePath,
    additionalQuestions: [],
  });
});

it("should throw if path isn't a directory", () => {
  mockLStat.mockReturnValueOnce(mockNotDirectory);

  expect(() => getTemplate(mockTemplatePath)).toThrowError(
    new Error("Template input isn't a directory")
  );
});

describe("when path is not a valid template", () => {
  beforeEach(() => {
    mockLStat
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(undefined);
  });

  it("should throw if path doesn't contain folders with config", () => {
    mockReadDirSync.mockReturnValueOnce([mockDirectory]);

    expect(() => getTemplate(mockTemplatePath)).toThrowError(
      new Error("Template does no contain a config")
    );

    expect(mockReadDirSync).toHaveBeenCalledWith(mockTemplatePath);
    expect(mockLStat).toHaveBeenCalledWith(
      path.join(mockTemplatePath, mockDirectory)
    );
  });

  it("should return folder path if one folder is found with config", () => {
    mockLStat
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(mockDataObject);
    mockReadDirSync.mockReturnValueOnce([mockDirectory]);

    const template = getTemplate(mockTemplatePath);

    expect(template).toEqual({
      directory: path.join(mockTemplatePath, mockDirectory),
      additionalQuestions: [],
    });
  });

  it("should ask user if multiple folders found", () => {
    mockReadDirSync.mockReturnValueOnce([mockDirectory, mockDirectory + 2]);
    mockLStat
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(mockIsDirectory);

    const template = getTemplate(mockTemplatePath);

    expect(template).toEqual({
      directory: path.join(mockTemplatePath),
      additionalQuestions: [
        {
          choices: [
            { title: "MOCK_DIRECTORY", value: "MOCK_DIRECTORY" },
            { title: "MOCK_DIRECTORY2", value: "MOCK_DIRECTORY2" },
          ],
          message: "Select a Template",
          name: "templateName",
          type: "select",
        },
      ],
    });
  });
});
