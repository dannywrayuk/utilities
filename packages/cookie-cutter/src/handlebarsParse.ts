import { casing } from "@dannywrayuk/casing";
import * as fs from "fs";
import * as handlebars from "handlebars";

// @dannywrayuk/casing
Object.entries(casing).forEach(([key, value]) => {
  handlebars.registerHelper(key, value);
});

// Data
handlebars.registerHelper("read", (input) => fs.readFileSync(input).toString());
handlebars.registerHelper("jsonParse", JSON.parse);

// Strings
handlebars.registerHelper("split", (delimiter, str) => str?.split(delimiter));
handlebars.registerHelper("join", (...args) => args.slice(1, -1).join(args[0]));
handlebars.registerHelper("trim", (str) => str.trim());
handlebars.registerHelper("replace", (a, b, str) => str.replaceAll(a, b));

// Dates
const date = new Date();
handlebars.registerHelper("year", () => date.getFullYear());
handlebars.registerHelper("month", () =>
  date.toLocaleString("default", { month: "numeric" })
);
handlebars.registerHelper("day", () =>
  date.toLocaleString("default", { day: "numeric" })
);

// Debug
handlebars.registerHelper("debug", (...args) => {
  console.log(JSON.stringify(args, null, 2));
  return `COOKIE-CUTTER-DEBUG${
    typeof args[0] === "string" ? "-" + args[0] : ""
  }`;
});

export const handlebarsParse = (
  input: string,
  variables: { [x: string]: string }
) => handlebars.compile(input)(variables);
