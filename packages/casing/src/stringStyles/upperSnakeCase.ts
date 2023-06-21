export const upperSnakeCase = (input: string[]) => {
  return input.reduce((total, current) => {
    return `${total.toUpperCase()}_${current.toUpperCase()}`;
  });
};
