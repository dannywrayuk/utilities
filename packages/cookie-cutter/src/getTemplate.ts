import fs from "fs";
import path from "path";
import { Choice, PromptType } from "prompts";
import { configFileName } from "./constants";
import { safe } from "./safe";

export const getTemplate = (templateArg: string) => {
  // check arg is a directory
  const isDirectory = safe(
    () => fs.lstatSync(templateArg).isDirectory(),
    "Template directory doesn't exist"
  )();

  if (!isDirectory) {
    throw new Error("Template input isn't a directory");
  }

  // if directory contains a config file
  if (safe(fs.lstatSync)(path.join(templateArg, configFileName)))
    return { directory: templateArg, additionalQuestions: [] };

  // if directory contains folders
  const folders = safe(() =>
    fs
      .readdirSync(templateArg)
      .filter((entry) =>
        fs.lstatSync(path.join(templateArg, entry)).isDirectory()
      )
  )();

  if (folders?.length === 1)
    return {
      directory: path.join(templateArg, folders[0]),
      additionalQuestions: [],
    };

  if (folders?.length > 1)
    return {
      directory: path.join(templateArg, folders[0]),
      additionalQuestions: [
        {
          type: "select" as PromptType,
          name: "templateName",
          message: "Select a Template",
          choices: folders as unknown as Choice[],
        },
      ],
    };

  throw new Error("Template does no contain a config");
};
