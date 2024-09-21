import { AuthFormButtonsComponent } from "./FormButtons";

interface AuthFormProps {
  inputListName: string;
  inputList: string;
  inputListType: string;
  handleInputChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
}

export const AuthFormComponent = ({
  inputListName,
  inputList,
  inputListType,
  handleInputChange
} : AuthFormProps ) => {
  return(
    <div className="w-screen flex flex-col items-center">
      <div className="w-1/3 relative">
        <input
          type={inputListType}
          value={inputList}
          onChange={handleInputChange}
          className="bg-gray-800 rounded-full w-full outline-none text-xl text-gray-200 pl-5 pr-12 h-12"
          placeholder={inputListName}
        />
        <AuthFormButtonsComponent/>
      </div>
    </div>
  )
}