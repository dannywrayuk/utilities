import { namedDelimiters, splitDelimiters } from "./delimiters";
import { extractWords } from "./extractWords";
import { capitalised, spongeBobbed } from "./wordStyles";

export type Options = {
  delimiter?: string;
  excludeFirstWord?: boolean;
  wordOperation?: (input: string) => string;
};

const calculate = (input: string[], options: Options) => {
  if (!input || input.length === 0) return "";

  const delimiter = options.delimiter ?? "";
  const wordOperation = options.wordOperation ?? ((input) => input);

  if (!options.excludeFirstWord) {
    input[0] = wordOperation(input[0]);
  }
  const reducer = (total: string, current: string) => {
    return total + delimiter + wordOperation(current);
  };

  return input.reduce(reducer);
};

export const custom = (
  input: string,
  options: Options & { splitDelimiters?: string }
) => {
  const parsedString = extractWords(
    input,
    options.splitDelimiters || splitDelimiters
  );
  return calculate(parsedString, options);
};

export const camel = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    wordOperation: capitalised,
    excludeFirstWord: true,
  });
};

export const pascal = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    wordOperation: capitalised,
  });
};

export const kebab = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.kebab,
  });
};

export const train = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: namedDelimiters.kebab,
  });
};

export const upperKebab = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.kebab,
  }).toUpperCase();
};

export const snake = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.snake,
  });
};

export const snakeTrain = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: namedDelimiters.snake,
  });
};

export const upperSnake = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.snake,
  }).toUpperCase();
};

export const none = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {});
};

export const upper = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {}).toUpperCase();
};

export const spaced = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.space,
  });
};

export const upperSpaced = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    delimiter: namedDelimiters.space,
  }).toUpperCase();
};

export const title = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: namedDelimiters.space,
  });
};

export const sentence = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  const spaced = calculate(parsedString, {
    delimiter: namedDelimiters.space,
  });
  return capitalised(spaced);
};

export const spongeBob = (input: string) => {
  const parsedString = extractWords(input, splitDelimiters);
  const spaced = calculate(parsedString, {
    delimiter: namedDelimiters.space,
  });
  return spongeBobbed(spaced);
};

export const casing = {
  camel,
  pascal,
  kebab,
  train,
  upperKebab,
  snake,
  snakeTrain,
  upperSnake,
  none,
  upper,
  spaced,
  upperSpaced,
  title,
  sentence,
  spongeBob,
};
