import fs from "fs";
import path from "path";
import { appNameRegex } from "./constants";
import { handlebarsParse } from "./handlebarsParse";
import { safe } from "./safe";

export const getDestination = (
  destinationArg: string,
  templateVariables: Record<string, string>
) => {
  const parsedDestination = handlebarsParse(destinationArg, templateVariables);

  const destinationExists = !!safe(fs.lstatSync)(
    parsedDestination
  )?.isDirectory();

  if (destinationExists) {
    return { directory: parsedDestination };
  }

  if (appNameRegex.test(parsedDestination)) {
    const appPath = path.join(".", parsedDestination);
    fs.mkdirSync(appPath);
    return { directory: appPath };
  }

  throw new Error(
    `Destination path or app name are not valid: ${parsedDestination}`
  );
};
