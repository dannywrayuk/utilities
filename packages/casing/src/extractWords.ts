type Accumulator = { words: string[]; chars: string[] };

const isUpperCase = (letter: string | undefined) =>
  letter?.toLowerCase() !== letter;

const addWord = (accumulator: Accumulator) =>
  accumulator.words.push(accumulator.chars.join("").toLowerCase());

export const extractWords = (input: string, delimiters: string) => {
  if (typeof input !== "string") return [];
  const result = input.split("").reduce(
    (accumulator: Accumulator, element: string) => {
      if (delimiters.includes(element)) {
        accumulator.chars.length > 0 && addWord(accumulator);
        accumulator.chars = [];
        return accumulator;
      }
      if (isUpperCase(element) && !isUpperCase(accumulator.chars.at(-1))) {
        accumulator.chars.length > 0 && addWord(accumulator);
        accumulator.chars = [];
        accumulator.chars.push(element);
        return accumulator;
      }
      if (
        !isUpperCase(element) &&
        isUpperCase(accumulator.chars.at(-1)) &&
        accumulator.chars.length > 1
      ) {
        accumulator.words.push(
          accumulator.chars.slice(0, -1).join("").toLowerCase()
        );
        accumulator.chars = accumulator.chars.slice(-1);
        accumulator.chars.push(element);
        return accumulator;
      }

      accumulator.chars.push(element);
      return accumulator;
    },
    { words: [], chars: [] }
  );
  result.chars.length > 0 && addWord(result);
  return result.words;
};
