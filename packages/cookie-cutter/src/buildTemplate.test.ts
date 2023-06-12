import * as fs from "node:fs";

import { buildTemplate } from "./buildTemplate";

beforeAll(() => {
  try {
    fs.rmSync(".TEST_OUTPUT", { recursive: true });
  } catch (e) {}
  fs.mkdirSync(".TEST_OUTPUT", { recursive: true });
});

it("test", () => {
  buildTemplate({
    templateDirectory: "./src/testTemplate",
    destinationDirectory: ".TEST_OUTPUT",
    templateVariables: {
      name: "steve",
    },
  });
});
