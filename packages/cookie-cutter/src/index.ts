#!/usr/bin/env node

import path from "path";
import prompt from "prompts";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { buildTemplate } from "./buildTemplate";
import { appNameRegex } from "./constants";
import { getConfigData } from "./getConfigData";
import { getDestination } from "./getDestination";
import { getTemplate } from "./getTemplate";

(async () => {
  const argv = await yargs(hideBin(process.argv)).argv;

  const [templateArg, destinationArg] = [
    argv._?.[0] || ".",
    argv._?.[1] || ".",
  ].map((arg) => (typeof arg === "string" ? arg : String(arg)));

  const template = getTemplate(templateArg);

  prompt.override(argv);
  const templateVariables: Record<string, string> = await prompt(
    template.additionalQuestions
  );

  const templateDirectory = path.join(
    template.directory,
    templateVariables?.templateName || ""
  );

  if (argv.name == null && appNameRegex.test(destinationArg)) {
    argv.name = destinationArg;
  }

  const configData = getConfigData(templateDirectory);

  prompt.override({ ...argv, ...templateVariables });
  const configVariables: Record<string, string> = await prompt(
    configData?.questions || []
  );

  const destination = getDestination(destinationArg, configVariables);

  buildTemplate({
    templateDirectory,
    destinationDirectory: destination.directory,
    templateVariables: configVariables,
  });
})();
