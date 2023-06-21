import { capitalised } from "../wordStyles";

export const camelCase = (input: string[]) => {
  return input.reduce((total, current) => {
    return total + capitalised(current);
  });
};
