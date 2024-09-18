import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
const region = process.env.NEXT_PUBLIC_REGION!;


interface UserAttributes {
  email: string;
  birthdate: string;
  nickname: string;
  preferred_username: string;
}

export const signUp = async (username : string, password: string, attributes: UserAttributes) => {
  try {
    const res = await fetch('/auth/api/crypto/calculateSecretHash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: attributes.email }),
    });
    const json = await res.json();
    const secretHash = json.secretHash
    const client = new CognitoIdentityProviderClient({ region });

    const signUpCommand = new SignUpCommand({
      ClientId: clientId,
      Username: username,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        { Name: "email", Value: attributes.email },
        { Name: "birthdate", Value: attributes.birthdate },
        { Name: "nickname", Value: attributes.nickname },
        { Name: "preferred_username", Value: attributes.preferred_username },
      ],
    });

    const signUpResponse = await client.send(signUpCommand);
    console.log("User signed up successfully:", signUpResponse);
    return signUpResponse;
  } catch (error: unknown) {
    console.error("Sign up failed:", (error as Error).message);
    throw error;
  }
};

