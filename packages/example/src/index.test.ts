import { example } from ".";

const logger = jest.spyOn(console, "log").mockImplementation(() => {});

describe("When the example is executed", () => {
  it("should log", () => {
    example();
    expect(logger).toBeCalledWith("Hello Example");
  });
});
