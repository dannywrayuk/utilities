<p align="center" >
 <img src="https://github.com/dannywrayuk/utilities/raw/main/packages/middy-zod-validator/assets/logo.svg" alt="Text Logo" width="250" />
</p>

<h1 align="center">Middy Zod Validator</h1>
<p align="center">A middy validation plugin that uses zod</p>
<p align="center">
  <a href="https://npmjs.org/package/@dannywrayuk/middy-zod-validator">
    <img src="https://img.shields.io/npm/v/@dannywrayuk/middy-zod-validator.svg" alt="version" />
  </a>
   <a href="https://bundlephobia.com/package/@dannywrayuk/middy-zod-validator">
    <img src="https://img.shields.io/bundlephobia/min/@dannywrayuk/middy-zod-validator.svg" alt="install size" />
  </a>
  <a href="https://npmjs.org/package/@dannywrayuk/middy-zod-validator">
    <img src="https://img.shields.io/npm/dm/@dannywrayuk/middy-zod-validator.svg" alt="downloads" />
  </a>
</p>

<br />

Use a zod schema to check the shape of your lambda Event, Context, Environment and Response.

## Install

Use your favourite package manager

Using npm:

```
$ npm install @dannywrayuk/middy-zod-validator
```

Using yarn:

```
$ yarn add @dannywrayuk/middy-zod-validator
```

Using pnpm:

```
$ pnpm add @dannywrayuk/middy-zod-validator
```

## Usage

After installation, slot it right into your middy config and pass it a schema.

```ts
export const eventSchema = z.object({
  body: z
    .object({
      HelloWorld: z.string(),
    })
    .strict(),
});

export const handler = middy(lambdaFunction).use(
  zodValidator({
    eventSchema,
  })
);
```

Keep your schema alongside your lambda function to type it appropriately

```ts
import { Handler } from "aws-lambda";

export const eventSchema = z.object({
  body: z
    .object({
      HelloWorld: z.string(),
    })
    .strict(),
});

type Event = z.infer<typeof eventSchema>;

export const lambdaFunction: Handler<Event> = async (event) => {
  /// ...
};
```

You can optionally combine this with AWS types using the provided `Overwrite` type

```ts
import { Overwrite } from "@dannywrayuk/middy-zod-validator";
import { APIGatewayProxyEvent, Handler } from "aws-lambda";

export const eventSchema = z.object({
  body: z
    .object({
      HelloWorld: z.string(),
    })
    .strict(),
});

type Event = Overwrite<APIGatewayProxyEvent, z.infer<typeof eventSchema>>;

export const lambdaFunction: Handler<Event> = async (event) => {
  /// ...
};
```

This way your lambda is secure at runtime and compile time!

## Contribution

If there is an option or feature you would like to see, please feel free to raise an issue or open a pull request. Contributions are welcome :)

## License

MIT © [Danny Wray](https://github.com/dannywrayuk/utilities/tree/main/packages/middy-zod-validator/LICENCE)
