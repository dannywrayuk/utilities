import * as handlebars from "handlebars";
import * as handlebarsHelpers from "handlebars-helpers";
handlebarsHelpers.default(["string", "date"]);

export const handlebarsParse = (
  input: string,
  variables: { [x: string]: string }
) => handlebars.compile(input)(variables);
