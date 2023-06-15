import * as z from "zod";
import prompt from "prompts";

import { buildTemplate } from "./buildTemplate";
import { getTemplate } from "./getTemplate";
import { getDestination } from "./getDestination";
import { getConfigData } from "./getConfigData";

const handleInputs = async (args: string[]) => {
  const [templateArg, destinationArg] = args;
  const templateDirectory = await getTemplate(templateArg);
  const configData = getConfigData(templateDirectory);
  const templateVariables: Record<string, string> = await prompt(
    configData.questions
  );

  const destinationDirectory = getDestination(
    destinationArg,
    templateVariables
  );

  buildTemplate({
    templateDirectory,
    destinationDirectory,
    templateVariables,
  });
};

const argParsed = z.array(z.string()).min(3).safeParse(process.argv);
if (argParsed.success) {
  handleInputs(argParsed.data.slice(2));
} else {
  console.log("Did you mean to call me with some arguments?");
}
