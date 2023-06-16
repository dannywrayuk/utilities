import fs from "node:fs";
import path from "node:path";

import { configFileName } from "./constants";
import { safe } from "./safe";

export const getConfigData = (templateArg: string) => {
  const configFilePath = path.join(templateArg, configFileName);

  const fileData = safe(
    fs.readFileSync,
    `Cannot read config file: ${configFilePath}`
  )(configFilePath).toString();

  const parsedData = safe(
    JSON.parse,
    `Cannot parse config file: ${configFilePath}`
  )(fileData);

  return parsedData;
};
