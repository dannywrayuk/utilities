import * as stringStyle from ".";

it("returns empty for empty input", () => {
  const output = stringStyle.custom("", {});
  expect(output).toBe("");
});

it("convert to Custom$Case", () => {
  const output = stringStyle.custom("hello-there", {
    delimiter: "$",
    wordOperation: () => "yes",
    actOnFirstWord: true,
  });
  expect(output).toBe("yes$yes");
});

it("convert to camelCase", () => {
  const output = stringStyle.camel("hello-there");
  expect(output).toBe("helloThere");
});

it("convert to PascalCase", () => {
  const output = stringStyle.pascal("hello-there");
  expect(output).toBe("HelloThere");
});

it("convert to kebab-case", () => {
  const output = stringStyle.kebab("hello-there");
  expect(output).toBe("hello-there");
});

it("convert to Train-Case", () => {
  const output = stringStyle.train("hello-there");
  expect(output).toBe("Hello-There");
});

it("convert to UPPER-KEBAB-CASE", () => {
  const output = stringStyle.upperKebab("hello-there");
  expect(output).toBe("HELLO-THERE");
});

it("convert to snake_case", () => {
  const output = stringStyle.snake("hello-there");
  expect(output).toBe("hello_there");
});

it("convert to Snake_Train_Case", () => {
  const output = stringStyle.snakeTrain("hello-there");
  expect(output).toBe("Hello_There");
});

it("convert to UPPER_SNAKE_CASE", () => {
  const output = stringStyle.upperSnake("hello-there");
  expect(output).toBe("HELLO_THERE");
});

it("convert to nocase", () => {
  const output = stringStyle.none("hello-there");
  expect(output).toBe("hellothere");
});

it("convert to UPPERCASE", () => {
  const output = stringStyle.upper("hello-there");
  expect(output).toBe("HELLOTHERE");
});

it("convert to space case", () => {
  const output = stringStyle.spaced("hello-there");
  expect(output).toBe("hello there");
});

it("convert to UPPER SPACE CASE", () => {
  const output = stringStyle.upperSpaced("hello-there");
  expect(output).toBe("HELLO THERE");
});

it("convert to Title Case", () => {
  const output = stringStyle.title("hello-there");
  expect(output).toBe("Hello There");
});

it("convert to Sentence case", () => {
  const output = stringStyle.sentence("hello-there");
  expect(output).toBe("Hello there");
});

it("convert to SpOnGeBoB CaSe", () => {
  const output = stringStyle.spongeBob("hello-there");
  expect(output).toBe("HeLlO ThErE");
});
