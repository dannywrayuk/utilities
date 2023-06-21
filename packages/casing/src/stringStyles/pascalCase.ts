import { capitalised } from "../wordStyles";

export const pascalCase = (input: string[]) => {
  return input.reduce((total, current) => {
    return total + capitalised(current);
  }, "");
};
