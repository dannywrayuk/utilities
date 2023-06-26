#!/usr/bin/env node
import { casing } from ".";
import { namedDelimiters } from "./delimiters";

const args = process.argv.slice(2);
const [caseStyle, ...input] = args;
const inputString = input.join(namedDelimiters.space);

if (!caseStyle) throw new Error("No style specified");

const caseFunction = (casing as Record<string, (input: string) => string>)[
  caseStyle
];

if (!caseFunction) throw new Error(`Unrecognised casing style: ${caseStyle}`);

console.log(caseFunction(inputString));
