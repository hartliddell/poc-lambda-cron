import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const region = "us-east-1";

const client = new SecretsManagerClient({ region });

export const getSecret = async (arn: string) => {
  try {
    const command = new GetSecretValueCommand({ SecretId: arn });
    const response = await client.send(command);

    if (response.SecretString) {
      return response.SecretString;
    } else {
      const decodedBinarySecret = Buffer.from(
        response.SecretBinary as Uint8Array
      ).toString("ascii");
      return decodedBinarySecret;
    }
  } catch (error) {
    console.error("Error retrieving secret:", error);
    throw error;
  }
};
