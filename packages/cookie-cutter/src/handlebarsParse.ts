import { casing } from "@dannywrayuk/casing";
import * as handlebars from "handlebars";

Object.entries(casing).forEach(([key, value]) => {
  handlebars.registerHelper(key, value);
});

const date = new Date();
handlebars.registerHelper("year", () => date.getFullYear());

handlebars.registerHelper("month", () =>
  date.toLocaleString("default", { month: "numeric" })
);

handlebars.registerHelper("day", () =>
  date.toLocaleString("default", { day: "numeric" })
);

handlebars.registerHelper("date", (options: string) => {
  if (typeof options !== "string") return date.toLocaleDateString();
  return date.toLocaleString(
    "default",
    options
      .split(",")
      .reduce((total: Record<string, string>, current: string) => {
        const [key, value] = current.trim().split(":");
        total[key] = value;
        return total;
      }, {})
  );
});

export const handlebarsParse = (
  input: string,
  variables: { [x: string]: string }
) => handlebars.compile(input)(variables);
