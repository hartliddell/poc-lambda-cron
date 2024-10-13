import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as path from "path";
import { Construct } from "constructs";

export class CronCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const foo = path.join(__dirname, "lambda");
    console.log("foo ...", foo);

    const lambdaFunction = new lambda.Function(this, "CronLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      // Path to the Lambda function code
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda")),
      handler: "handler",
    });

    // Define the cron schedule using EventBridge rule
    const rule = new events.Rule(this, "LambdaCronRule", {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
    });

    // Set the Lambda function as the target of the EventBridge rule
    rule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
