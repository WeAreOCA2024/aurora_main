interface AuthFormProps {
  index: number;
  username: string;
  systemMessage: string;
  inputListName: string[];
  inputList: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const AuthFormComponent = ({index,username,systemMessage,inputListName,inputList,handleInputChange}:AuthFormProps) => {
  return(
    <div>
      <h2 className="text-3xl text-center mt-64">username : {index != 0 ? username : "未設定"}</h2>
      <p className="text-red-500 text-center">{systemMessage}</p>
      <div className="flex justify-center mt-12">
        <input
          type={inputListName[index]}
          value={inputList[index]}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-1/4"
          maxLength={index != 1 ? 20 : 30}
          placeholder={inputListName[index]}
        />
      </div>
    </div>
  )
}