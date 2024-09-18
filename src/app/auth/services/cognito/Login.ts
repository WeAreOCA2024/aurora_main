import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
const region = process.env.NEXT_PUBLIC_REGION!;

export const CognitoLogin = async (email: string, password: string) => {
  try {
    const res = await fetch('/auth/api/crypto/calculateSecretHash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    const secretHash = json.secretHash;
    const client = new CognitoIdentityProviderClient({ region });

    const initiateAuthCommand = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    const authResponse = await client.send(initiateAuthCommand);
    console.log("User logged in successfully:", authResponse);
    return authResponse.AuthenticationResult;
  } catch (error: unknown) {
    console.error("Login failed:", (error as Error).message);
    throw error;
  }
};