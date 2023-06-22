export const spongeBobbed = (input: string) =>
  input
    .split("")
    .map((char: string, index: number) =>
      index % 2 ? char : char.toUpperCase()
    )
    .join("");
