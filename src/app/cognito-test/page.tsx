'use client';

import { useEffect, useState } from 'react';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import CryptoJS from 'crypto-js';

const region = 'ap-northeast-1'; // 使用するリージョン
const identityPoolId = process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID; // 環境変数から取得
const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID; // 環境変数から取得
const clientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID; // 環境変数から取得
const clientSecret = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_SECRET; // 環境変数から取得

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId!,
  ClientId: clientId!,
});

const calculateSecretHash = (username: string) => {
  const secretHash = CryptoJS.HmacSHA256(username + clientId!, clientSecret!).toString(CryptoJS.enc.Base64);
  return secretHash;
};

export default function CognitoTest() {
  const [credentials, setCredentials] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!identityPoolId) {
      setError('Cognito Identity Pool ID is not set.');
      return;
    }

    if (isAuthenticated) {
      // Initialize Cognito Identity Client
      const cognitoIdentityClient = new CognitoIdentityClient({ region });

      // Set up the credentials provider
      const idToken = 'YOUR_ID_TOKEN'; // Replace 'YOUR_ID_TOKEN' with the actual value of the idToken
      const credentialsProvider = fromCognitoIdentityPool({
        client: cognitoIdentityClient,
        identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken!,
        },
      });

      const fetchCredentials = async () => {
        try {
          // Obtain credentials
          const creds = await credentialsProvider();
          setCredentials(creds);
        } catch (err) {
          setError(`Error obtaining credentials: ${err}`);
        }
      }

      fetchCredentials();
    }
  }, [isAuthenticated]);

  const authenticateUser = (username: string, password: string) => {

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          setIsAuthenticated(true);
          resolve(result);
        },
        onFailure: (err) => reject(err),
      });
    });
  };

  return (
    <div>
      <h1>Cognito Credentials Test</h1>
      <button onClick={() => authenticateUser('username', 'password')}>Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {credentials ? (
        <pre>{JSON.stringify(credentials, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
