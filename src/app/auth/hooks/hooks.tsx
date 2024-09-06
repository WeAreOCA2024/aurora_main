
interface handleSignupProps {
  username: string;
  email: string;
  password: string;
}

export const handleSignup = ({username,email,password}:handleSignupProps) => {
  alert(`username: ${username}, email: ${email}, password: ${password}`);
}