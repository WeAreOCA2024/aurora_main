import { CognitoIdentityProviderClient, SignUpCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

const clientId = process.env.NEXT_PUBLIC_AWS_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_AWS_CLIENT_SECRET_KEY!;
const region = process.env.NEXT_PUBLIC_AWS_REGION!;

function calculateSecretHash(clientId: string, clientSecret: string, username: string): string {
  const msg = username + clientId;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(msg);
  return hmac.digest("base64");
}

export const signup = async (username:string,email:string,password:string) => {
  try {
    const secretHash = calculateSecretHash(clientId, clientSecret, username);
    const client = new CognitoIdentityProviderClient({ region });

    try {
      const signUpCommand = new SignUpCommand({
        ClientId: clientId,
        Username: username,
        Password: password,
        SecretHash: secretHash,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      });

      const signUpResponse = await client.send(signUpCommand);
      console.log("User signed up successfully:", signUpResponse);
      return signUpResponse;
    } catch (signUpError: unknown) {
      alert("error");
    }
  } catch (error:unknown) {
    console.error("Failed to sign up or sign in user:", (error as Error).message);
  }
};

export const confirmSignUpUser = async (username: string, confirmationCode: string) => {
  const secretHash = calculateSecretHash(clientId, clientSecret, username);
  const client = new CognitoIdentityProviderClient({ region });

  try {
    const confirmSignUpCommand = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: username,
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
    });

    const confirmSignUpResponse = await client.send(confirmSignUpCommand);
    return confirmSignUpResponse;
  } catch (error) {
    console.error("Error confirming sign up:", error);
  }
};