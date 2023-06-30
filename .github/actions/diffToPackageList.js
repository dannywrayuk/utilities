const fs = require("node:fs");

let GIT_DIFF = fs.readFileSync("GIT_DIFF").toString();

const changedFiles = GIT_DIFF.split("\n");

const changedPackages = new Set();
changedFiles.forEach((file) => {
  const matches = file.match(/^packages\/([a-z0-9\-]+)/);
  if (matches?.[0]) {
    changedPackages.add(matches[1]);
  }
});
console.log("changed_packages=" + JSON.stringify(Array.from(changedPackages)));
