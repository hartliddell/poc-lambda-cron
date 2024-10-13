#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CronCdkStack } from "../lib/stack";

const app = new cdk.App();
new CronCdkStack(app, "CronCdkStack");
