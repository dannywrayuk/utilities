import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class TestLambda extends Construct {
  constructor(scope: any, id: any) {
    super(scope, id);
    const testFunction = new NodejsFunction(this, "handler", {
      runtime: Runtime.NODEJS_20_X,
    });
    new LambdaRestApi(this, "apigateway", { handler: testFunction });
  }
}
