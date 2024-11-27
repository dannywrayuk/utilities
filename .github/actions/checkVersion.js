const fs = require("node:fs");
const path = require("node:path");

const LATEST_VERSION = fs.readFileSync("LATEST_VERSION").toString();

const npmResponse = JSON.parse(LATEST_VERSION);
console.log("NPM Response:\n" + JSON.stringify(npmResponse, null, 2));
const latestVersion = npmResponse.version;

const packageName = npmResponse.name.replace("@dannywrayuk/", "");

const CURRENT_PACKAGE = fs
  .readFileSync(path.join("packages", packageName, "package.json"))
  .toString();
const packageData = JSON.parse(CURRENT_PACKAGE);
const currentVersion = packageData.version;
console.log("Current package version: " + currentVersion);

const latestVersionArray = latestVersion.split(".");
const currentVersionArray = currentVersion.split(".");

if (
  Number(currentVersionArray[0]) - Number(latestVersionArray[0]) === 1 ||
  Number(currentVersionArray[1]) - Number(latestVersionArray[1]) === 1 ||
  Number(currentVersionArray[2]) - Number(latestVersionArray[2]) === 1
) {
  console.log(
    "Current (" +
      currentVersion +
      ") is greater than latest (" +
      latestVersion +
      ")"
  );
} else {
  throw new Error(
    "Current (" +
      currentVersion +
      ") is not greater than latest (" +
      latestVersion +
      "). Cannot publish a lower version."
  );
}
