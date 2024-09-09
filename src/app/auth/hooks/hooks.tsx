export const handleSignup = async ({username,email,password}:{username:string,email:string,password:string}) => {
  alert(`username: ${username}, email: ${email}, password: ${password}`);

}

export const handleLogin = async ({username,password}:{username:string,password:string}) => {
  alert(`username: ${username}, password: ${password}`);
}