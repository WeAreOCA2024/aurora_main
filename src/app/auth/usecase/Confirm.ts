import { CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '@/lib/cognito/userPool';

interface ConfirmProps {
  email: string;
  confirmCode: string;
  setServerMode: (mode: "login" | null) => void;
  router: any;
}

export const Confirm = ({
  email,
  confirmCode,
  setServerMode,
  router
} : ConfirmProps ) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmCode, true, (err) => {
    if (err) {
      console.error('Confirmation error', err);
      return;
    }

    const userChoice = confirm('このアカウントでログインしますか？');
    if (userChoice) {
      setServerMode('login');
    } else {
      router.push('/auth');
    }
  });
};