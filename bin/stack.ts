#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CustomStack } from "../lib/stack";

const app = new cdk.App();
new CustomStack(app, "CustomStack");
