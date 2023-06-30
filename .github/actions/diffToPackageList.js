const [diff] = process.argv.slice(2);
const changedFiles = diff.split(",");

const changedPackages = new Set();
changedFiles.forEach((file) => {
  const matches = file.match(/^packages\/([a-z0-9\-]+)/);
  if (matches?.[0]) {
    changedPackages.add(matches[1]);
  }
});
console.log(Array.from(changedPackages));
