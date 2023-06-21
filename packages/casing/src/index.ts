import { lex } from "./lexer";
import {
  camelCase,
  kebabCase,
  pascalCase,
  snakeCase,
  upperSnakeCase,
} from "./stringStyles";

export const asCamelCase = (input: string) => {
  const parsedString = lex(input);
  return camelCase(parsedString);
};

export const asPascalCase = (input: string) => {
  const parsedString = lex(input);
  return pascalCase(parsedString);
};

export const asKebabCase = (input: string) => {
  const parsedString = lex(input);
  return kebabCase(parsedString);
};

export const asSnakeCase = (input: string) => {
  const parsedString = lex(input);
  return snakeCase(parsedString);
};
export const asUpperSnakeCase = (input: string) => {
  const parsedString = lex(input);
  return upperSnakeCase(parsedString);
};
