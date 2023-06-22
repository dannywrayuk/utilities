import * as stringStyle from ".";

it("convert to camelCase", () => {
  const output = stringStyle.camelCase("hello-there");
  expect(output).toBe("helloThere");
});

it("convert to PascalCase", () => {
  const output = stringStyle.pascalCase("hello-there");
  expect(output).toBe("HelloThere");
});

it("convert to kebab-case", () => {
  const output = stringStyle.kebabCase("hello-there");
  expect(output).toBe("hello-there");
});

it("convert to Train-Case", () => {
  const output = stringStyle.trainCase("hello-there");
  expect(output).toBe("Hello-There");
});

it("convert to UPPER-KEBAB-CASE", () => {
  const output = stringStyle.upperKebabCase("hello-there");
  expect(output).toBe("HELLO-THERE");
});

it("convert to snake_case", () => {
  const output = stringStyle.snakeCase("hello-there");
  expect(output).toBe("hello_there");
});

it("convert to snake_case", () => {
  const output = stringStyle.snakeTrainCase("hello-there");
  expect(output).toBe("Hello_There");
});

it("convert to UPPER_SNAKE_CASE", () => {
  const output = stringStyle.upperSnakeCase("hello-there");
  expect(output).toBe("HELLO_THERE");
});

it("convert to nocase", () => {
  const output = stringStyle.nocase("hello-there");
  expect(output).toBe("hellothere");
});

it("convert to UPPERCASE", () => {
  const output = stringStyle.upperCase("hello-there");
  expect(output).toBe("HELLOTHERE");
});

it("convert to space case", () => {
  const output = stringStyle.spaceCase("hello-there");
  expect(output).toBe("hello there");
});

it("convert to UPPER SPACE CASE", () => {
  const output = stringStyle.upperSpaceCase("hello-there");
  expect(output).toBe("HELLO THERE");
});

it("convert to Title Case", () => {
  const output = stringStyle.titleCase("hello-there");
  expect(output).toBe("Hello There");
});

it("convert to Sentence case", () => {
  const output = stringStyle.sentenceCase("hello-there");
  expect(output).toBe("Hello there");
});

it("convert to SpOnGeBoB CaSe", () => {
  const output = stringStyle.spongeBobCase("hello-there");
  expect(output).toBe("HeLlO ThErE");
});
