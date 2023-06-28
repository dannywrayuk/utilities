<p align="center" >
 <img src="https://github.com/dannywrayuk/utilities/raw/main/packages/cookie-cutter/assets/logo.svg" alt="Text Logo" width="250" />
</p>

<h1 align="center">Cookie Cutter</h1>
<p align="center">Boilerplate generation based on template directories</p>
<p align="center">
  <a href="https://npmjs.org/package/@dannywrayuk/cookie-cutter">
    <img src="https://img.shields.io/npm/v/@dannywrayuk/cookie-cutter.svg" alt="version" />
  </a>
   <a href="https://bundlephobia.com/package/@dannywrayuk/cookie-cutter">
    <img src="https://img.shields.io/bundlephobia/min/@dannywrayuk/cookie-cutter.svg" alt="install size" />
  </a>
  <a href="https://npmjs.org/package/@dannywrayuk/cookie-cutter">
    <img src="https://img.shields.io/npm/dm/@dannywrayuk/cookie-cutter.svg" alt="downloads" />
  </a>
</p>

<br />

With Cookie Cutter you can generate code, files, and folders using a directory as your template. It uses [handlebars](https://www.npmjs.com/package/handlebars) and [prompts](https://www.npmjs.com/package/prompts) under the hood to ask the user for information and then populate the template. This library should speed up your workflow anytime you find yourself writing boilerplate. It works great for anything from react components to entire projects.

## Install

> Installation is not required for one time use, you can simply execute this package as a script eg `npx @dannywrayuk/cookie-cutter`. However, if you intend on using this script multiple times, it would decrease execution time by installing the dependency.

Use your favourite package manager

Using npm:

```
$ npm install @dannywrayuk/cookie-cutter
```

Using yarn:

```
$ yarn add @dannywrayuk/cookie-cutter
```

Using pnpm:

```
$ pnpm add @dannywrayuk/cookie-cutter
```

## Usage

All uses of Cookie Cutter are going to look something like this:

```
$ @dannywrayuk/cookie-cutter <template-directory> <output-directory>
```

Where `template-directory` is the path of a template containing a valid `template.config.json`, and `output-directory` is a path to the desired output destination of the generated content.

### The Template

The template must be contained inside a directory and contain all the files and folders that should be created at the output. The file names, directories, and file content may all contain [handlebar expressions](https://handlebarsjs.com/guide/#simple-expressions) that will be resolved using data collected from user prompts.
Helpers are available to help with the generation of data from the user input, eg changing the casing of the input. For this, [casing](https://github.com/dannywrayuk/utilities/tree/main/packages/casing) is used as a helper and `{{year}}`,`{{month}}` and `{{day}}` are implemented internally.

### Template Config

All valid templates must contain a `template.config.json` at their root, this is to guide Cookie Cutter when generating your content. This primary purpose of this config is to list the user questions - these are needed to prompt the user and gather required template variables.
An example config:

```json
{
  "questions": [
    {
      "type": "text",
      "name": "name",
      "message": "What is your name?",
      "initial": "Danny"
    }
  ]
}
```

where each question in the array is a [prompt type](https://github.com/terkelg/prompts#-types) defined by prompts.

## Options

```
$ @dannywrayuk/cookie-cutter <template-directory> <output-directory> <...extra>
```

### template-directory

The path to a template, or a directory containing multiple templates. If the folder contains multiple templates the user will be prompted to select a template. Defaults to the current directory when not supplied.

### output-directory

The desired output path, or a new folder name. This is the location the content will be created in. However, if a folder name is provided that does not already exist, a directory of that name will first be created. This folder name is also passed into the generator and will override the `name` parameter in the template config.

Optionally the output directory can also contain handlebar expressions such as `output/{{service-type}}/` and the expression will be resolved before generation begins.

### ...extra

The answers to any user prompts can be manually passed as arguments to Cookie Cutter and these prompts will be skipped when generating.
An override for `name` would be:

```
$ @dannywrayuk/cookie-cutter <template-directory> <output-directory> --name Danny
```

## Contribution

If there is an option or feature you would like to see, please feel free to raise an issue or open a pull request. Contributions are welcome :)

## License

MIT © [Danny Wray](https://github.com/dannywrayuk/utilities/blob/main/packages/cookie-cutter/LICENCE)
