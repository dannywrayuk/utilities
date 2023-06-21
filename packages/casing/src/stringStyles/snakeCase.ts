export const snakeCase = (input: string[]) => {
  return input.reduce((total, current) => {
    return `${total}_${current}`;
  });
};
