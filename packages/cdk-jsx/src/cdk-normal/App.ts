import { App } from "aws-cdk-lib";
import { NormalStack } from "./NormalStack";

const app = new App();

new NormalStack(app, "normal-stack");
