import { describeShape } from ".";

describe("base types", () => {
  [
    { id: "string", input: "hello", output: "string" },
    { id: "number", input: 123, output: "number" },
    { id: "boolean", input: false, output: "boolean" },
    { id: "null", input: null, output: "null" },
    { id: "undefined", input: undefined, output: "undefined" },
    { id: "function", input: () => {}, output: "function" },
  ].forEach((t) => {
    it(`should return ${t.id}`, () => {
      const input = t.input;
      const output = describeShape(input);
      expect(output).toEqual(t.output);
    });
  });
});

describe("Objects", () => {
  [
    { id: "empty", input: {}, output: {} },
    {
      id: "simple",
      input: {
        element1: "hello",
        element2: 123,
      },
      output: {
        element1: "string",
        element2: "number",
      },
    },
    {
      id: "nested",
      input: {
        element1: "hello",
        element2: 123,
        element6: {
          element1: "hello",
          element2: 123,
        },
      },
      output: {
        element1: "string",
        element2: "number",
        element6: {
          element1: "string",
          element2: "number",
        },
      },
    },
  ].forEach((t) => {
    it(`should return ${t.id}`, () => {
      const input = t.input;
      const output = describeShape(input);
      expect(output).toEqual(t.output);
    });
  });
});

describe("Arrays", () => {
  [
    { id: "empty", input: [], output: [] },
    {
      id: "simple",
      input: [1, 2, 3, 4],
      output: ["number", "number", "number", "number"],
    },
    {
      id: "nested",
      input: [123, [4, 5, 6]],
      output: ["number", ["number", "number", "number"]],
    },
    {
      id: "object with array",
      input: { element1: [{ element1: "hello" }] },
      output: { element1: [{ element1: "string" }] },
    },
  ].forEach((t) => {
    it(`should return ${t.id}`, () => {
      const input = t.input;
      const output = describeShape(input);
      expect(output).toEqual(t.output);
    });
  });
});

describe("Constructed Objects", () => {
  it(`should return ObjectName`, () => {
    class ObjectName {
      public property = "";
      method() {}
    }
    const input = new ObjectName();
    const output = describeShape(input);
    expect(output).toEqual("ObjectName");
  });
  it(`should return ObjectName`, () => {
    const input = new Date();
    const output = describeShape(input);
    expect(output).toEqual("Date");
  });
});

describe("Slightly odd Stuff", () => {
  [{ id: "regex", input: /hi/, output: "RegExp" }].forEach((t) => {
    it(`should return ${t.id}`, () => {
      const input = t.input;
      const output = describeShape(input);
      expect(output).toEqual(t.output);
    });
  });

  it("should throw on cyclic object", () => {
    const cyclicObject = { element1: {} };
    cyclicObject.element1 = cyclicObject;
    expect(() =>
      describeShape(cyclicObject, { enableCyclicCheck: true })
    ).toThrow(
      new Error(
        "Converting circular structure to JSON\n    --> starting at object with constructor 'Object'\n    --- property 'element1' closes the circle"
      )
    );
  });
});
