<p align="center" >
 <img src="https://github.com/dannywrayuk/utilities/raw/main/packages/casing/assets/logo.svg" alt="Text Logo" width="250" />
</p>

<h1 align="center">Casing</h1>
<p align="center">Convert the casing of a string to common alternatives</p>
<p align="center">
  <a href="https://npmjs.org/package/@dannywrayuk/casing">
    <img src="https://img.shields.io/npm/v/@dannywrayuk/casing.svg" alt="version" />
  </a>
   <a href="https://bundlephobia.com/package/@dannywrayuk/casing">
    <img src="https://img.shields.io/bundlephobia/min/@dannywrayuk/casing.svg" alt="install size" />
  </a>
  <a href="https://npmjs.org/package/@dannywrayuk/casing">
    <img src="https://img.shields.io/npm/dm/@dannywrayuk/casing.svg" alt="downloads" />
  </a>
</p>

<br />

Easily swap between common variable name casing formats with these utility functions. Many of the most common formats have an implementation and can be used as both an input or output. Import them into your projects or use them on the command line!

## Install

Use your favourite package manager

Using npm:

```
$ npm install @dannywrayuk/casing
```

Using yarn:

```
$ yarn add @dannywrayuk/casing
```

Using pnpm:

```
$ pnpm add @dannywrayuk/casing
```

## Usage

Import the casings directly into your project.

```ts
import { pascal } from "@dannywrayuk/casing";

const projectName = "PROJECT_NAME";

const projectNameInPascalCase = pascal(projectName);

console.log(projectNameInPascalCase);
// ProjectName
```

or use it on the command line

```
$ casing upperSnake string-to-convert
STRING_TO_CONVERT
```

Even without installation

```
$ npx @dannywrayuk/casing upperSnake string-to-convert
```

## Options

The possible output styles are:
| Exported function | Example |
|---|---|
|camel|exampleString|
|pascal|ExampleString|
|kebab|example-string|
|train|Example-String|
|upperKebab|EXAMPLE-STRING|
|snake|example_string|
|snakeTrain|Example_String|
|upperSnake|EXAMPLE_STRING|
|none|examplestring|
|upper|EXAMPLESTRING|
|spaced|example string|
|upperSpaced|EXAMPLE STRING|
|title|Example String|
|sentence|Example string|
|spongeBob|ExAmPlE sTrInG|

If none of these meet your needs, there is also a `custom` function that accepts a set of options to customise the output (not available on the command line).

```ts
import { custom } from "@dannywrayuk/casing";

const projectName = "PROJECT_NAME";

const projectNameInCustomCase = custom(projectName, {
  delimiter: ".",
});

console.log(projectNameInCustomCase);
// project.name
```

The allowed custom options are:

```ts
export type customOptions = {
  // Delimiter applied between each word of the output
  delimiter?: string;

  // A function that transforms a word, this is applied to each word
  wordOperation?: (input: string) => string;

  // Should the first word be skipped by wordOperation. Defaults is false.
  excludeFirstWord?: boolean;

  // It's unlikely you will need this. Enables the parsing of a custom delimiter on the input string.
  splitDelimiters?: string;
};
```

## Contribution

If there is an option or feature you would like to see, please feel free to raise an issue or open a pull request. Contributions are welcome :)

## License

MIT © [Danny Wray](https://github.com/dannywrayuk/utilities/tree/main/packages/casing/LICENCE)
