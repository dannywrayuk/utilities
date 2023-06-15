import fs from "node:fs";
import path from "node:path";
import * as handlebars from "handlebars";
import { appNameRegex } from "./constants";
import { safe } from "./safe";

export const getDestination = (
  destinationArg: string | undefined,
  templateVariables: Record<string, string>
) => {
  if (!destinationArg) {
    throw new Error(`An output destination is required`);
  }

  const parsedDestination =
    handlebars.compile(destinationArg)(templateVariables);
  const destinationExists = !!safe(fs.lstatSync)(
    parsedDestination
  )?.isDirectory();

  if (destinationExists) {
    return parsedDestination;
  }
  if (appNameRegex.test(parsedDestination)) {
    const appPath = path.join(".", parsedDestination);
    fs.mkdirSync(appPath);
    return appPath;
  }

  throw new Error(
    `Destination path or app name are not valid: ${parsedDestination}`
  );
};
