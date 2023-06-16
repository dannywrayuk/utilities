export const safe =
  (x: (...args: any) => any, onError?: string | ((e: Error) => void)) =>
  (...callerArgs: any) => {
    try {
      return x(...callerArgs);
    } catch (e) {
      if (onError) {
        if (typeof onError === "string") throw new Error(onError);
        return onError(e as Error);
      }
      return null;
    }
  };
