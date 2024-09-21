import { userPool } from '@/lib/cognito/userPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

interface SignupProps {
  email: string;
  password: string;
  attributes: attributes;
  setServerMode: (mode: null | "confirm") => void;
}
interface attributes{
  nickname:string;
  birthday:string;
  preferred_username:string;
};


export const Signup = ({
  email,
  password,
  attributes:{nickname,birthday,preferred_username},
  setServerMode,
}: SignupProps ) => {
  const attributes = [
    new CognitoUserAttribute({
      Name: 'nickname',
      Value: nickname,
    }),
    new CognitoUserAttribute({
      Name: 'birthdate',
      Value: birthday,
    }),
    new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: preferred_username,
    }),
  ];

  try{
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) {
        console.error('Signup error', err);
        return;
      }
      const cognitoUser = result?.user;
      setServerMode('confirm');
      console.log('Signup successful', cognitoUser);
    });
  }catch(e){
    console.error('Signup error');
  }
};