import { splitDelimiters } from "./delimiters";
import { extractWords } from "./extractWords";

it("should not throw on undefined", () => {
  // @ts-expect-error for testing
  const output = extractWords(undefined, splitDelimiters);
  expect(output).toEqual([]);
});

it("should not throw on empty", () => {
  const output = extractWords("", splitDelimiters);
  expect(output).toEqual([]);
});

it("should not throw on non string", () => {
  // @ts-expect-error for testing
  const output = extractWords(12345, splitDelimiters);
  expect(output).toEqual([]);
});

it("should parse delimited text", () => {
  const output = extractWords("test-string-hello-there", splitDelimiters);
  expect(output).toEqual(["test", "string", "hello", "there"]);
});

it("should parse mixed delimited text", () => {
  const output = extractWords(
    "test-String.HELLO_there this   works",
    splitDelimiters
  );
  expect(output).toEqual(["test", "string", "hello", "there", "this", "works"]);
});

it("should parse cased text", () => {
  const output = extractWords("ThisIsAStringWITHCasing", splitDelimiters);
  expect(output).toEqual(["this", "is", "a", "string", "with", "casing"]);
});

it("should parse mixed delimiter and cased text", () => {
  const output = extractWords("This-Is.A_StringUUID", splitDelimiters);
  expect(output).toEqual(["this", "is", "a", "string", "uuid"]);
});
