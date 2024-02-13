import { App, NestedStack, Stack } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export const LookupLambda = () => {
  return (
    <Construct>
      <NodejsFunction
        runtime={Runtime.NODEJS_20_X}
        entry={process.cwd() + "/src/cdk-weird/TestLambda.handler.ts"}
      />
    </Construct>
  );
};

const TestLookup = () => {
  return (
    <NestedStack>
      <LookupLambda />
    </NestedStack>
  );
};

const ApiGateway= ()=>{return} 

const Api = () => {
  return (
    <Stack>
      <ApiGateway />
      <TestLookup />
    </Stack>
  );
};

const app = () => {
  return (
    <App>
      <Api />
    </App>
  );
};

app()();
