import { userPool } from '@/lib/cognito/userPool';
import {
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

interface LoginProps {
  email: string;
  password: string;
  router: any;
}

export const Login = ({
  email,
  password,
  router
} : LoginProps ) => {

  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      console.log('Access Token:', accessToken);
      router.push('/main');
    },
    onFailure: (err) => {
      console.error('Login error', err);
    },
  });
};
