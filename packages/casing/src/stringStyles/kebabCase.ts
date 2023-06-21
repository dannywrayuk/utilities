export const kebabCase = (input: string[]) => {
  return input.reduce((total, current) => {
    return `${total}-${current}`;
  });
};
