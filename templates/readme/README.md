<p align="center" >
 <img src="https://github.com/dannywrayuk/utilities/raw/main/assets/logo.svg" alt="Text Logo" width="250" />
</p>

<h1 align="center">Utilities</h1>
<p align="center">A monorepo containing useful packages. See the readme of the packages for more details.</p>

<br />

## Package List

{{#each (split " " packages) as | package |}}
{{#with (jsonParse (read (join "/" "packages" (trim package) "package.json"))) as | packageJson |}}

### [{{title package}}](https://github.com/dannywrayuk/utilities/raw/main/packages/{{package}}/README.md)

{{packageJson.description}}

<p>
  <a href="https://npmjs.org/package/@dannywrayuk/{{package}}">
    <img src="https://img.shields.io/npm/v/@dannywrayuk/{{package}}.svg" alt="version" />
  </a>
   <a href="https://bundlephobia.com/package/@dannywrayuk/{{package}}">
    <img src="https://img.shields.io/bundlephobia/min/@dannywrayuk/{{package}}.svg" alt="install size" />
  </a>
  <a href="https://npmjs.org/package/@dannywrayuk/{{package}}">
    <img src="https://img.shields.io/npm/dm/@dannywrayuk/{{package}}.svg" alt="downloads" />
  </a>
</p>

```
$ yarn add @dannywrayuk/{{package}}
```

{{/with}}
{{/each}}

## Contribution

If there is an option or feature you would like to see, please feel free to raise an issue or open a pull request. Contributions are welcome :)

<br />

---

---

## Metadata

This readme was automatically generated using a [cookie-cutter template](https://github.com/dannywrayuk/utilities/raw/main/templates/readme/README.md). This is some metadata about the generation process, it's not very interesting to humans.

timestamp: {{{timestamp}}}

packages_hash: {{{packagesHash}}}
