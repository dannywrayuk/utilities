type Options = {
  enableCyclicCheck?: boolean;
};

export const describeShape: any = (input: any, options?: Options) => {
  if (options?.enableCyclicCheck) JSON.stringify(input);
  return internalDescribeShape(input);
};

const internalDescribeShape: any = (input: any) => {
  if (input === null) return "null";
  if (Array.isArray(input))
    return input.map((element: any) => describeShape(element));
  if (typeof input === "object") {
    const inputPrototype = Object.getPrototypeOf(input);
    if (inputPrototype.constructor.name === "Object") {
      return Object.entries(input).reduce(
        (total: Record<string, any>, [key, value]): any => {
          total[key] = describeShape(value);
          return total;
        },
        {}
      );
    } else {
      return inputPrototype.constructor.name;
    }
  }
  return typeof input;
};
