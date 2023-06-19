import fs from "fs";
import path from "path";
import { handlebarsParse } from "./handlebarsParse";

export type TemplateConfig = {
  templateDirectory: string;
  destinationDirectory: string;
  templateVariables: { [x: string]: string };
};

export const buildTemplate = (config: TemplateConfig) => {
  const parseExpression = (text: string) => {
    return handlebarsParse(text, config.templateVariables);
  };

  const copyDirectory = (source: string, destination: string) => {
    const sourceDir = fs.readdirSync(source);
    sourceDir.forEach((element) => {
      const elementSourcePath = path.join(source, element);
      const elementStats = fs.lstatSync(elementSourcePath);
      if (elementStats.isDirectory()) {
        const directoryName = parseExpression(element);
        const elementDestinationPath = path.join(destination, directoryName);
        fs.mkdirSync(elementDestinationPath);
        copyDirectory(elementSourcePath, elementDestinationPath);
      } else {
        const fileName = parseExpression(element);
        const fileData = fs.readFileSync(elementSourcePath).toString();
        const parsedData = parseExpression(fileData);
        fs.writeFileSync(path.join(destination, fileName), parsedData);
      }
    });
  };

  copyDirectory(config.templateDirectory, config.destinationDirectory);
  try {
    fs.rmSync(path.join(config.destinationDirectory, "template.config.json"));
  } catch (e) {}
};
