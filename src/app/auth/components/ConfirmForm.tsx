interface ConfirmFormProps {
  confirmCode: string;
  setConfirmCode: (s: string) => void;
  handleConfirm: () => void;
}

export const ConfirmFormComponent = ({
  confirmCode,
  setConfirmCode,
  handleConfirm
} : ConfirmFormProps ) => {
  return(
    <div className="w-screen">
      <div className="flex justify-center gap-4">
        <input
          type="text"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          className="border border-gray-300 rounded-md w-1/3 outline-none text-xl text-black px-3 py-2"
          placeholder="認証コード"
        />
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white rounded-md px-3 py-2"
        >
          確認
        </button>
      </div>
    </div>
  )
}