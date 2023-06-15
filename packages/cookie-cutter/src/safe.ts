export const safe =
  (x: (...args: any) => any) =>
  (...callerArgs: any) => {
    try {
      return x(...callerArgs);
    } catch (e) {
      return null;
    }
  };
