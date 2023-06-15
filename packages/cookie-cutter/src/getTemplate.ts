import fs from "node:fs";
import path from "node:path";
import prompt, { Choice } from "prompts";
import { safe } from "./safe";
import { configFileName } from "./constants";

const getTemplateName = async (templateArg: string) => {
  const folders = safe(() =>
    fs
      .readdirSync(templateArg)
      .filter((entry) =>
        fs.lstatSync(path.join(templateArg, entry)).isDirectory()
      )
  )();

  if (!folders || folders.length === 0)
    throw new Error("No templates exist in this directory");
  if (folders.length === 1) return folders[0];
  return (
    await prompt({
      type: "select",
      name: "value",
      message: "Select a Template",
      choices: folders as unknown as Choice[],
    })
  ).value;
};

export const getTemplate = async (templateArg: string) => {
  if (!safe(() => fs.lstatSync(templateArg).isDirectory())()) {
    throw new Error("Template directory isn't a directory");
  }
  if (safe(fs.lstatSync)(path.join(templateArg, configFileName)))
    return templateArg;
  const templateName = await getTemplateName(templateArg);
  if (
    safe(fs.lstatSync)(path.join(templateArg, templateName, configFileName))
  ) {
    return path.join(templateArg, templateName);
  }
  throw new Error("Template directory doesn't exist");
};
