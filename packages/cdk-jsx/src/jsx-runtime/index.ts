const testSymbol = Symbol.for("jsii.rtti");

// @ts-expect-error is ok
export const jsx = (...args) => {
  const [component, props] = args;
  if (Object.getOwnPropertySymbols(component).includes(testSymbol)) {
    return (y: any) => {
      const { ref, children, ...rest } = props;
      Object.entries(rest).forEach(([key, value]) => {
        // @ts-expect-error is ok
        if (value?.isRef) {
          // @ts-expect-error is ok
          rest[key] = value.current;
        }
      });

      console.log(component.name, ":");
      console.log(y?.constructor?.name);
      console.log(rest);

      const x = new component(y, component?.name || "test", rest);

      if (ref) {
        ref.current = x;
      }

      if (children) {
        if (Array.isArray(children)) {
          children.forEach((element) => element(x));
        } else {
          children(x);
        }
      }
      return x;
    };
  }
  return component(props);
};

// @ts-expect-error is ok
export const jsxs = (...args) => {
  return jsx(...args);
};

export const useRef = (x?: any) => {
  console.log("useRef");
  return { current: x, isRef: true };
};
