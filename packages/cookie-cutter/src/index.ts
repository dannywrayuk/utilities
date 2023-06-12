import fs from "node:fs";
import path from "node:path";
import prompt from "prompt-sync";
import * as z from "zod";

import { buildTemplate } from "./buildTemplate";

const configSchema = z.array(
  z.object({ id: z.string(), question: z.string(), default: z.string() })
);
type Config = z.infer<typeof configSchema>;
const argSchema = z.array(z.string()).min(3);

const readConfig = (templateDirectory: string) => {
  return fs.readFileSync(path.join(templateDirectory, "template.config.json"));
};

const askUser = (configData: Config) =>
  configData.reduce((config: Record<string, any>, configItem) => {
    const response = prompt()(
      `${configItem.question} (${configItem.default}): `
    );
    config[configItem.id] = response;
    return config;
  }, {});

const argParsed = argSchema.safeParse(process.argv);
if (argParsed.success) {
  const [templateDirectory, destinationDirectory] = argParsed.data.slice(2);
  const configData = JSON.parse(readConfig(templateDirectory).toString());

  const configParsed = configSchema.safeParse(configData);
  if (configParsed.success) {
    const templateVariables = askUser(configParsed.data);
    buildTemplate({
      templateDirectory,
      destinationDirectory,
      templateVariables,
    });
  } else {
  }
} else {
}
