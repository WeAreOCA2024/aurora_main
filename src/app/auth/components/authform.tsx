interface AuthFormProps {
  index: number;
  systemMessage: string;
  inputListName: string[];
  inputList: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const AuthFormComponent = ({index,systemMessage,inputListName,inputList,handleInputChange}:AuthFormProps) => {
  return(
    <div className="w-screen">
      <p className="text-red-500 text-center">{systemMessage}</p>
      <div className="flex justify-center">
        <input
          type={inputListName[index]}
          value={inputList[index]}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-1/3 outline-none text-xl text-black px-3 py-2"
          maxLength={index != 1 ? 20 : 50}
          placeholder={inputListName[index]}
        />
      </div>
    </div>
  )
}