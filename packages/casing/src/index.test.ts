import * as stringStyle from ".";

it("convert to camelCase", () => {
  const output = stringStyle.asCamelCase("hello-there");
  expect(output).toBe("helloThere");
});

it("convert to PascalCase", () => {
  const output = stringStyle.asPascalCase("hello-there");
  expect(output).toBe("HelloThere");
});

it("convert to kebab-case", () => {
  const output = stringStyle.asKebabCase("hello-there");
  expect(output).toBe("hello-there");
});

it("convert to Train-Case", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("Hello_There");
});

it("convert to UPPER-KEBAB-CASE", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("Hello_There");
});

it("convert to snake_case", () => {
  const output = stringStyle.asSnakeCase("hello-there");
  expect(output).toBe("hello_there");
});

it("convert to UPPER_SNAKE_CASE", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("HELLO_THERE");
});

it("convert to nocase", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("hellothere");
});

it("convert to UPPERCASE", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("HELLOTHERE");
});

it("convert to space case", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("hello there");
});
it("convert to UPPER SPACE CASE", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("hello there");
});

it("convert to Title Case", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("Hello There");
});

it("convert to Sentence case", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("Hello there");
});

it("convert to SpOnGeBoB CaSe", () => {
  const output = stringStyle.asUpperSnakeCase("hello-there");
  expect(output).toBe("HeLlO ThErE");
});
