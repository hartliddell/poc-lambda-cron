import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as sm from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { LambdaRestApi, MethodLoggingLevel } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Website } from "@symphoniacloud/cdk-website";

export class CustomStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "StravaTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    const fastifyLambda = new NodejsFunction(this, "FastifyLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: "lib/fastifyHandler.ts",
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    table.grantReadWriteData(fastifyLambda);

    new LambdaRestApi(this, "FastifyApi", {
      handler: fastifyLambda,
      proxy: true,
      integrationOptions: {
        timeout: Duration.seconds(29),
      },
      deployOptions: {
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
    });
  }
}
