import fs from "node:fs";
import path from "node:path";
import { getTemplate } from "./getTemplate";
import prompt from "prompts";

const mockTemplatePath = "MOCK_TEMPLATE_PATH";
const mockDirectory = "MOCK_DIRECTORY";
const mockDataObject = { MOCK: "DATA" };
const mockIsDirectory = { isDirectory: () => true };
const mockNotDirectory = { isDirectory: () => false };

jest.mock("prompts", () => () => ({ value: mockDirectory }));

const mockLStat = jest.fn();
jest.spyOn(fs, "lstatSync").mockImplementation(mockLStat);

const mockReadDirSync = jest.fn();
jest.spyOn(fs, "readdirSync").mockImplementation(mockReadDirSync);

beforeEach(() => {
  jest.clearAllMocks();
});

it("should return template path if path supplied is valid", async () => {
  mockLStat
    .mockReturnValueOnce(mockIsDirectory)
    .mockReturnValueOnce(mockDataObject);

  const template = await getTemplate(mockTemplatePath);

  expect(template).toEqual(mockTemplatePath);
});

it("should throw if path isn't a directory", async () => {
  mockLStat.mockReturnValueOnce(mockNotDirectory);

  (
    await expect(async () => await getTemplate(mockTemplatePath))
  ).rejects.toThrowError(new Error("Template directory isn't a directory"));
});

describe("when path is not a valid template", () => {
  beforeEach(() => {
    mockLStat.mockReturnValueOnce(mockIsDirectory);
  });

  it("should throw if path doesn't contain folders", async () => {
    mockLStat.mockReturnValueOnce(undefined);
    mockReadDirSync.mockReturnValueOnce([mockDirectory]);

    (
      await expect(async () => await getTemplate(mockTemplatePath))
    ).rejects.toThrowError(new Error("No templates exist in this directory"));

    expect(mockReadDirSync).toHaveBeenCalledWith(mockTemplatePath);
    expect(mockLStat).toHaveBeenCalledWith(
      path.join(mockTemplatePath, mockDirectory)
    );
  });

  it("should return folder path if one folder is found with config", async () => {
    mockLStat
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(mockDataObject);
    mockReadDirSync.mockReturnValueOnce([mockDirectory]);

    const template = await getTemplate(mockTemplatePath);

    expect(template).toEqual(path.join(mockTemplatePath, mockDirectory));
  });

  it("should throw if one folder is found without config", async () => {
    mockLStat
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(undefined);
    mockReadDirSync.mockReturnValueOnce([mockDirectory]);

    (
      await expect(async () => await getTemplate(mockTemplatePath))
    ).rejects.toThrowError(new Error("Template directory doesn't exist"));

    expect(mockReadDirSync).toHaveBeenCalledWith(mockTemplatePath);
    expect(mockLStat).toHaveBeenCalledWith(
      path.join(mockTemplatePath, mockDirectory)
    );
  });
  it("should ask user if multiple folders found", async () => {
    mockLStat
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(mockIsDirectory)
      .mockReturnValueOnce(mockDataObject);
    mockReadDirSync.mockReturnValueOnce([mockDirectory, mockDirectory + 2]);

    const template = await getTemplate(mockTemplatePath);

    expect(template).toEqual(path.join(mockTemplatePath, mockDirectory));
  });
});
