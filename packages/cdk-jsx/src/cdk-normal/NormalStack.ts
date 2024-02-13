import { Stack } from "aws-cdk-lib";
import { TestLambda } from "./TestLambda";

export class NormalStack extends Stack {
  constructor(scope: any, id: any, props?: any) {
    super(scope, id, props);
    new TestLambda(this, "test-lambda");
  }
}
