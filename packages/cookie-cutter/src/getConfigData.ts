import fs from "node:fs";
import path from "node:path";

import { configFileName } from "./constants";

export const getConfigData = (templateArg: string) => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(templateArg, configFileName)).toString()
    );
  } catch (e) {
    throw new Error(`Could not parse config file. ${(e as Error).message}`);
  }
};
