<p align="center" >
 <img src="https://github.com/dannywrayuk/utilities/raw/main/packages/describe-shape/assets/logo.svg" alt="Text Logo" width="250" />
</p>

<h1 align="center">Describe Shape</h1>
<p align="center">Simple object descriptions, perfect for your logs</p>
<p align="center">
  <a href="https://npmjs.org/package/@dannywrayuk/describe-shape">
    <img src="https://img.shields.io/npm/v/@dannywrayuk/describe-shape.svg" alt="version" />
  </a>
   <a href="https://npmjs.org/package/@dannywrayuk/describe-shape">
    <img src="https://img.shields.io/bundlephobia/min/@dannywrayuk/describe-shape.svg" alt="install size" />
  </a>
  <a href="https://npmjs.org/package/@dannywrayuk/describe-shape">
    <img src="https://img.shields.io/npm/dm/@dannywrayuk/describe-shape.svg" alt="downloads" />
  </a>
</p>

<br />

Use this library to create a description of an input using only [primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) and class names. This is useful for debugging and logging where using the full object could reveal sensitive information.

## Install

Use your favourite package manager

Using npm:

```
$ npm install @dannywrayuk/describe-shape
```

Using yarn:

```
$ yarn add @dannywrayuk/describe-shape
```

Using pnpm:

```
$ pnpm add @dannywrayuk/describe-shape
```

## Usage

```js
import { describeShape } from "@dannywrayuk/describe-shape";

const objectShape = describeShape(someObject);

console.log(objectShape);
```

This package only exports one function, super simple!

## Examples

### Simple Primitive

For a simple primitive, the output of describeShape is the same as that of the built in `typeof`:

```js
describeShape("Hello World!");
```

Returns:

```json
"string"
```

### Objects and Arrays

When describing an object, keys will be maintained and the values replaced with their types. Arrays will maintain their length, with each elements being described in full:

```js
describeShape({
  id: 1234,
  secretInformation: ["this is a secret", "do not log me"],
  otherData: {
    awesome: true,
  },
});
```

Returns:

```js
{
  id: "number",
  secretInformation: ["string", "string"],
  otherData: {
    awesome: "boolean",
  },
}
```

### Classes

Instances of classes are described by the constructor name used to create them:

```js
class SomeClass {}

describeShape({
    message: new SomeClass();
    date: new Date();
    filter: new RegExp("^ThatsCool$")
});
```

Returns:

```js
{
  message: "SomeClass",
  date: "Date",
  filter: "RegExp"
}
```

## Options

Currently there is only one option available for use, this is an optional check for cyclic objects before describing the object. This check can be useful, since the internals of this library operate recursively and circular references would result in an infinite loop.

You can enable this check by calling the function with `{ enableCyclicCheck: true }`.

```js
const circular = {};
circular.loop = circular;

describeShape(circular, { enableCyclicCheck: true });
// Throws, no infinite loop!
```

## Contribution

If there is an option or feature you would like to see, please feel free to raise an issue or open a pull request. Contributions are welcome :)

## License

MIT © [Danny Wray](https://github.com/dannywrayuk/utilities/blob/main/packages/describe-shape/LICENCE)
