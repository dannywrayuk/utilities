import { delimiters } from "./constants";
import { lex } from "./lexer";
import { capitalised, spongeBobbed } from "./wordStyles";

type Options = {
  delimiter?: string;
  actOnFirstWord?: boolean;
  wordOperation?: (input: string) => string;
};

const calculate = (input: string[], options: Options) => {
  const delimiter = options.delimiter ?? "";
  const wordOperation = options.wordOperation ?? ((input) => input);

  const reducer = (total: string, current: string) => {
    return total + delimiter + wordOperation(current);
  };
  if (options.actOnFirstWord) {
    return input.reduce(reducer, "");
  }
  return input.reduce(reducer);
};

export const camelCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    wordOperation: capitalised,
  });
};

export const pascalCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    wordOperation: capitalised,
    actOnFirstWord: true,
  });
};

export const kebabCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.kebab,
  });
};

export const trainCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: delimiters.kebab,
    actOnFirstWord: true,
  });
};

export const upperKebabCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.kebab,
    actOnFirstWord: true,
  }).toUpperCase();
};

export const snakeCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.snake,
  });
};

export const snakeTrainCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: delimiters.snake,
    actOnFirstWord: true,
  });
};

export const upperSnakeCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.snake,
    actOnFirstWord: true,
  }).toUpperCase();
};

export const nocase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {});
};

export const upperCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {}).toUpperCase();
};

export const spaceCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.space,
  });
};

export const upperSpaceCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    delimiter: delimiters.space,
  }).toUpperCase();
};

export const titleCase = (input: string) => {
  const parsedString = lex(input);
  return calculate(parsedString, {
    wordOperation: capitalised,
    delimiter: delimiters.space,
    actOnFirstWord: true,
  });
};

export const sentenceCase = (input: string) => {
  const parsedString = lex(input);
  const spaceCase = calculate(parsedString, {
    delimiter: delimiters.space,
  });
  return capitalised(spaceCase);
};

export const spongeBobCase = (input: string) => {
  const parsedString = lex(input);
  const spaceCase = calculate(parsedString, {
    delimiter: delimiters.space,
  });
  return spongeBobbed(spaceCase);
};
